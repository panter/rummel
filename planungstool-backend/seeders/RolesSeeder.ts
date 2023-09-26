import type { EntityManager } from '@mikro-orm/postgresql';
import { Role } from '@panter/nestjs-utils';
import { Seeder } from '@mikro-orm/seeder';
import { SeederContext } from './seeder.context';
import { UserRoles } from '../apps/api/src/modules/user-identity/user-roles.enum';

export class RolesSeeder extends Seeder {
  private em!: EntityManager;
  private context!: SeederContext;

  async run(em: EntityManager, context: SeederContext): Promise<void> {
    this.em = em;
    this.context = context;
    await this.seedRoles();
  }

  async seedRoles() {
    console.log('Seeding role(s)');
    this.context.roles = [];
    const rolesNames = [UserRoles.user];
    for (const name of rolesNames) {
      const role = this.em.create(Role, {
        name,
        permissions: [],
        users: [],
      });
      this.context.roles.push(role);
    }
    return this.em.persist(this.context.roles);
  }
}
