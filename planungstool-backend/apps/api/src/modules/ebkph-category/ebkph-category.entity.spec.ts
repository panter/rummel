import { EbkphCategory } from './ebkph-category.entity';
import { MikroORM } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

describe('EbkphCategory', () => {
  let orm: MikroORM;

  beforeAll(async () => {
    orm = await MikroORM.init({
      entities: [EbkphCategory],
      dbName: 'ebkph_category_entity_test',
      clientUrl: `postgresql://postgres:postgres@localhost:5432/veloclick_test?schema=public`,
      metadataProvider: TsMorphMetadataProvider,
      type: 'postgresql',
      allowGlobalContext: true,
    });
    await orm.getSchemaGenerator().dropSchema(); // Cleanup any existing data
    await orm.getSchemaGenerator().createSchema(); // Create new schema
  });

  afterAll(async () => {
    await orm.getSchemaGenerator().dropSchema(); // Cleanup test data
    await orm.close();
  });

  it('should create a new ebkph category', async () => {
    const category = new EbkphCategory({ name: 'Food', description: 'C1' });
    await orm.em.persistAndFlush(category);
    expect(category.id).toBeDefined();
    expect(category.name).toEqual('Food');
  });

  it('should create a new subcategory with a parent category', async () => {
    const parentCategory = new EbkphCategory({
      name: 'Grocery',
      description: 'C1',
    });
    await orm.em.persistAndFlush(parentCategory);

    const subcategory = new EbkphCategory({
      name: 'Fruits',
      description: 'C1.1',
      parent: parentCategory,
    });
    await orm.em.persistAndFlush(subcategory);

    expect(subcategory.id).toBeDefined();
    expect(subcategory.name).toEqual('Fruits');
    expect(subcategory.parent).toEqual(parentCategory);
  });

  it('should not allow duplicate ebkph category names', async () => {
    const category = new EbkphCategory({ name: 'Home', description: 'C1' });
    await orm.em.persistAndFlush(category);

    const duplicateCategory = new EbkphCategory({
      name: 'Home',
      description: 'C1',
    });
    await expect(orm.em.persistAndFlush(duplicateCategory)).rejects.toThrow();
  });
});
