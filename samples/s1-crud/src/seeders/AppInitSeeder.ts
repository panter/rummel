import type { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';
import { Logger, Type } from '@nestjs/common';
import { data, SeedData } from './data';
import { logger } from '@mikro-orm/nestjs';
import { Dictionary } from '@mikro-orm/core';
import { AppRole } from '../entities/role.entity';
import { AppUser } from '../entities/app-user.entity';
import { Permission } from '../authorization';

export class AppInitSeeder extends Seeder {
  private readonly logger = new Logger(AppInitSeeder.name);

  async run(em: EntityManager, context: Dictionary): Promise<void> {
    if (!context) {
      context = {};
    }
    const data = this.getData();
    this.logger.log('Seeding database...');
    if (await em.count(AppRole)) {
      this.logger.log('Database already seeded. Skipping...');
      return;
    }
    await this.seedRoles(data, em, context);
    for (const user of data.users) {
      user.role = context.roles.find(
        (role: AppRole) => role.name === user.role.name,
      );
    }
    this.seed(AppUser, data.users, em);
    this.logger.log('Database seeded.');
  }

  async seedRoles(data: SeedData, em: EntityManager, context: Dictionary) {
    this.logger.log(`seeding roles...`);
    context.roles = [];
    const permissionsCache = new Map<string, Permission>();
    for (const rawRole of data.roles) {
      const role = em.create(AppRole, {
        name: rawRole.name,
        isDefault: rawRole.isDefault,
        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        permissions: rawRole.permissions.map((rawPermission) => {
          if (
            !permissionsCache.has(
              `${rawPermission.action}_${rawPermission.subject}`,
            )
          ) {
            permissionsCache.set(
              `${rawPermission.action}_${rawPermission.subject}`,
              em.create(Permission, {
                action: rawPermission.action,
                subject: rawPermission.subject,
                condition: rawPermission.condition,
              }),
            );
          }
          return permissionsCache.get(
            `${rawPermission.action}_${rawPermission.subject}`,
          );
        }),
      });
      rawRole.permissions.forEach((rawPermission) => {
        const permission = permissionsCache.get(
          `${rawPermission.action}_${rawPermission.subject}`,
        );
        permission.roles.add(role);
      });

      context.roles.push(role);
    }
    return em.persist(context.roles);
  }

  createManyFromRaw<T>(
    type: Type<T>,
    data: Partial<T>[],
    em: EntityManager,
  ): T[] {
    return data.map((item) => em.create(type, item));
  }

  seed<T>(type: Type<T>, data: Partial<T>[], em: EntityManager): void {
    const items = this.createManyFromRaw(type, data, em);
    this.logger.log(`Seeding ${items.length} ${type.name}...`);
    em.persist(items);
  }

  getData = (): SeedData => {
    const env = process.env.NODE_ENV || 'development';
    if (env === 'production') {
      logger.log(
        `Node environment is ${env}. Using production data for seeding.`,
      );
      return data.production;
    } else {
      logger.log(
        `Node environment is ${env}. Using development data for seeding.`,
      );
      return data.development;
    }
  };
}
