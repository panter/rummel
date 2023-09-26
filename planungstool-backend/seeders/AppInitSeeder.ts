import { AdminSeeder } from './AdminSeeder';
import { CategorySeeder } from './CategorySeeder';
import type { EntityManager } from '@mikro-orm/postgresql';
import { RolesSeeder } from './RolesSeeder';
import { Seeder } from '@mikro-orm/seeder';
import { SeederContext } from './seeder.context';
import { EbkphCategorySeeder } from './EbkphCategorySeeder';
import { PostalCodesSeeder } from './PostalCodesSeeder';

export class AppInitSeeder extends Seeder {
  private em!: EntityManager;
  private context!: SeederContext;

  async run(em: EntityManager, context: SeederContext): Promise<void> {
    this.em = em;
    this.context = context || {};
    await this.call(
      em,
      [
        RolesSeeder,
        AdminSeeder,
        CategorySeeder,
        EbkphCategorySeeder,
        PostalCodesSeeder,
      ],
      context,
    );
  }
}
