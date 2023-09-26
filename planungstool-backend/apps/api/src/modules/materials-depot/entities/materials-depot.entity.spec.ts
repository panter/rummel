import { MaterialsDepot } from './materials-depot.entity';
import { MikroORM } from '@mikro-orm/postgresql';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { User } from '../../user-identity';

describe('MaterialsDepotEntity', () => {
  let orm: MikroORM;

  beforeAll(async () => {
    orm = await MikroORM.init({
      entities: [MaterialsDepot],
      dbName: 'materials_depot_entity_test',
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

  it('should create a new materials depot', async () => {
    const entity = new MaterialsDepot({
      shortName: 'ekb',
      name: 'Schulhaus Eiche',
      responsableUser: new User(),
    });
    await orm.em.persistAndFlush(entity);
    expect(entity.id).toBeDefined();
    expect(entity.shortName).toEqual('ekb');
    expect(entity.name).toEqual('Schulhaus Eiche');
    expect(entity.responsableUser).toBeDefined();
  });

  it('should not allow duplicate materials depot shortName', async () => {
    const entity = new MaterialsDepot({
      shortName: 'ekb',
      name: 'Schulhaus Eiche',
      responsableUser: new User(),
    });
    await orm.em.persistAndFlush(entity);

    const duplicateEntity = new MaterialsDepot({
      shortName: 'trk',
      name: 'Schulhaus Lorze',
      responsableUser: new User(),
    });
    await expect(orm.em.persistAndFlush(duplicateEntity)).rejects.toThrow();
  });
});
