import { Category } from '../apps/api/src/modules/category/category.entity';
import type { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';
import { SeederContext } from './seeder.context';
import rawCategories, { CategoryRaw } from './data/categories';

export class CategorySeeder extends Seeder {
  private em!: EntityManager;
  private context!: SeederContext;

  async run(em: EntityManager, context: SeederContext): Promise<void> {
    this.em = em;
    this.context = context;
    await this.seedCategories();
  }

  async seedCategories() {
    console.log('Seeding categories');
    for (const rawCategory of rawCategories) {
      this.createCategoryTree(rawCategory);
    }
    await this.em.flush();
  }

  private createCategoryTree(categoryRaw: CategoryRaw, parent?: Category) {
    const subCategory = new Category({
      name: categoryRaw.name,
      sortOrder: categoryRaw.sortOrder,
      parent,
    });
    if (categoryRaw.subCategories?.length) {
      categoryRaw.subCategories.forEach((subCategoryRaw) => {
        this.createCategoryTree(subCategoryRaw, subCategory);
      });
    } else {
      this.em.persist(
        new Category({
          name: categoryRaw.name,
          sortOrder: categoryRaw.sortOrder,
          parent,
        }),
      );
    }
  }
}
