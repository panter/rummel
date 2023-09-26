import type { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';
import { SeederContext } from './seeder.context';
import ebkphCategories, { EbkphCategoryRaw } from './data/ebkphCategories';
import { EbkphCategory } from '../apps/api/src/modules/ebkph-category/ebkph-category.entity';

export class EbkphCategorySeeder extends Seeder {
  private em!: EntityManager;
  private context!: SeederContext;

  async run(em: EntityManager, context: SeederContext): Promise<void> {
    this.em = em;
    this.context = context;
    await this.seedEbkphCategories();
  }

  async seedEbkphCategories() {
    console.log('Seeding ebkph categories');
    for (const rawCategory of ebkphCategories) {
      this.createCategoryTree(rawCategory);
    }
    await this.em.flush();
  }

  private createCategoryTree(
    categoryRaw: EbkphCategoryRaw,
    parent?: EbkphCategory,
  ) {
    const subCategory = new EbkphCategory({
      name: categoryRaw.name,
      description: categoryRaw.description,
      parent,
    });
    if (categoryRaw.subCategories?.length) {
      categoryRaw.subCategories.forEach((subCategoryRaw) => {
        this.createCategoryTree(subCategoryRaw, subCategory);
      });
    } else {
      this.em.persist(
        new EbkphCategory({
          name: categoryRaw.name,
          description: categoryRaw.description,
          parent,
        }),
      );
    }
  }
}
