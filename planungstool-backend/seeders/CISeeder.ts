import type { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';
import { SeederContext } from './seeder.context';
import { DevSeeder } from './DevSeeder';
import { User } from '../apps/api/src/modules/user-identity';

/*
 * This seeder is used to seed the database in CI environment.
 * It is skipped in production environment.
 */
export class CISeeder extends Seeder {
  async run(em: EntityManager, context: SeederContext): Promise<void> {
    if (process.env.ENV_SHORT !== 'prod') {
      const user = await em.findOne(User, { $exists: true });
      if (!user) {
        await this.call(em, [DevSeeder], context);
        // await this.call(em, [ListingsSeeder], context);
      } else {
        console.log(
          'Database seed is skipped because there are already users.',
        );
      }
    } else {
      console.log('Database seed is skipped in production environment.');
    }
  }
}
