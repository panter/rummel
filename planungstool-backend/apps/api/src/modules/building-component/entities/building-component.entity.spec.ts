import { BuildingComponent } from './building-component.entity';
import { MaterialsDepot } from '../../materials-depot/entities/materials-depot.entity';
import { MikroORM } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { User } from '../../user-identity';

describe('BuildingComponentEntity', () => {
  let orm: MikroORM;

  beforeAll(async () => {
    orm = await MikroORM.init({
      entities: [BuildingComponent],
      dbName: 'building_component_entity_test',
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

  it('should create a new building component', async () => {
    const entity = new BuildingComponent({
      materialsDepot: new MaterialsDepot({
        shortName: 'zku',
        name: '',
        responsableUser: new User(),
      }),
    });
    entity;
    await orm.em.persistAndFlush(entity);
  });

  it('should not allow duplicate building component identification', async () => {
    const entity = new BuildingComponent({
      materialsDepot: new MaterialsDepot({
        shortName: 'ebk',
        name: '',
        responsableUser: new User(),
      }),
    });
    await orm.em.persistAndFlush(entity);

    const duplicateEntity = new BuildingComponent({
      materialsDepot: new MaterialsDepot({
        shortName: 'ebk',
        name: '',
        responsableUser: new User(),
      }),
    });
    await expect(orm.em.persistAndFlush(duplicateEntity)).rejects.toThrow();
  });
});
