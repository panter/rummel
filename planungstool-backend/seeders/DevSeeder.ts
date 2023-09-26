import { Seeder } from '@mikro-orm/seeder';
import { EntityManager } from '@mikro-orm/postgresql';
import { AppInitSeeder } from './AppInitSeeder';
import { AdminSeeder } from './AdminSeeder';

export class DevSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    return this.call(em, [AppInitSeeder, AdminSeeder]);
  }
}
