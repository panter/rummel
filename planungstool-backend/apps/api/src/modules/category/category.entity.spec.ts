import { Category } from './category.entity';
import { MikroORM } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';

describe('CategoryEntity', () => {
  let orm: MikroORM;

  beforeAll(async () => {
    orm = await MikroORM.init({
      entities: [Category],
      dbName: 'category_entity_test',
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

  it('should create a new category', async () => {
    const category = new Category({ name: 'Food' });
    await orm.em.persistAndFlush(category);
    expect(category.id).toBeDefined();
    expect(category.name).toEqual('Food');
  });

  it('should create a new subcategory with a parent category', async () => {
    const parentCategory = new Category({ name: 'Grocery' });
    await orm.em.persistAndFlush(parentCategory);

    const subcategory = new Category({
      name: 'Fruits',
      parent: parentCategory,
    });
    await orm.em.persistAndFlush(subcategory);

    expect(subcategory.id).toBeDefined();
    expect(subcategory.name).toEqual('Fruits');
    expect(subcategory.parent).toEqual(parentCategory);
  });

  it('should not allow duplicate category names', async () => {
    const category = new Category({ name: 'Home' });
    await orm.em.persistAndFlush(category);

    const duplicateCategory = new Category({ name: 'Home' });
    await expect(orm.em.persistAndFlush(duplicateCategory)).rejects.toThrow();
  });
});
