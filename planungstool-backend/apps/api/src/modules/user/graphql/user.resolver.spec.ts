import { Test, TestingModule } from '@nestjs/testing';
import { UserResolver } from './user.resolver';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import { EntityManager, MikroORM } from '@mikro-orm/postgresql';
import { NestApplication } from '@nestjs/core';
import { User } from '../../user-identity';
import { UserModule } from '../user.module';

let app: NestApplication;
let orm: MikroORM;
let em: EntityManager;
let user: User;
beforeAll(async () => {
  orm = await MikroORM.init({
    schema: 'public',
    dbName: 'veloclick_test',
    user: 'postgres',
    password: 'postgres',
    type: 'postgresql',
    metadataProvider: TsMorphMetadataProvider,
    entities: [User],
  });
  await orm.getSchemaGenerator().ensureDatabase();
  await orm.getMigrator().up();
  em = orm.em.fork();
});
beforeEach(async () => {
  await orm.schema.clearDatabase();
  // user = em.create<User>(User, {
  //   businessId: '1711c418-c8fe-4a7f-8377-4c30a6d11093',
  //   phoneNumber: '+420123456789',
  //   createdAt: '2022-12-20T12:00',
  //   updatedAt: '2022-12-20T12:00',
  // });
  await em.persistAndFlush(user);
});

afterAll(async () => {
  await orm.close(true);
});

afterEach(async () => await app.close());

describe('UserResolver', () => {
  let resolver: UserResolver;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [MikroOrmModule.forRoot(), UserModule],
      providers: [UserResolver],
    }).compile();
    app = module.createNestApplication();
    await app.init();

    resolver = module.get<UserResolver>(UserResolver);
  });

  it('should be defined', () => {
    expect(resolver).toBeDefined();
  });
});
