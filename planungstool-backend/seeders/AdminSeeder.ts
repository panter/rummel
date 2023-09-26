import type { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';
import { SeederContext } from './seeder.context';
import { User } from '../apps/api/src/modules/user-identity';
import users, { UserRaw } from './data/users';

export class AdminSeeder extends Seeder {
  private em!: EntityManager;
  private context!: SeederContext;

  async run(em: EntityManager, context: SeederContext): Promise<void> {
    this.em = em;
    this.context = context;

    this.seedInitialUsers(users);
  }

  private seedInitialUsers(users: UserRaw[]) {
    console.log('Seeding seedInitialUsers');

    this.context.initialUsers = users.map((user) => {
      const userRole = this.context.roles.find(
        (r) => r.name === (user.userAuthority.role as unknown as string),
      );
      return this.em.create(User, {
        email: user.email,
        createdAt: new Date(),
        updatedAt: new Date(),
        verifiedAt: new Date(),
        userAuthority: {
          role: userRole,
        },
      });
    });
    this.em.persist(this.context.initialUsers);
  }
}
