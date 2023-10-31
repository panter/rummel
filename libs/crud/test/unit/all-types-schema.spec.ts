import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
  Resolver,
} from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';
import { printSchema } from 'graphql/utilities';
import {
  CreateOneResolver,
  DeleteOneResolver,
  FindManyResolver,
  FindOneResolver,
  ObjectRelationResolvers,
  UpdateOneResolver,
} from '../../src';
import { Dummy2 } from './fixtures/all-types-schema2.fixtures';
import { Dummy } from './fixtures/all-types-shema.fixtures';

@Resolver(() => Dummy)
export class CreateOneDummyResolver extends CreateOneResolver(Dummy) {}

@Resolver(() => Dummy)
export class UpdateOneDummyResolver extends UpdateOneResolver(Dummy) {}

@Resolver(() => Dummy)
export class FindOneDummyResolver extends FindOneResolver(Dummy) {}

@Resolver(() => Dummy)
export class FindManyDummyResolver extends FindManyResolver(Dummy) {}

@Resolver(() => Dummy)
export class DeleteOneDummyResolver extends DeleteOneResolver(Dummy) {}

describe('Graphql types', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [GraphQLSchemaBuilderModule],
    }).compile();
  });

  it('should generate graphql schema with all fields', async () => {
    const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
    const schema = await gqlSchemaFactory.create(
      [
        CreateOneDummyResolver,
        UpdateOneDummyResolver,
        DeleteOneDummyResolver,
        FindOneDummyResolver,
        FindManyDummyResolver,
        ...ObjectRelationResolvers(Dummy),
        ...ObjectRelationResolvers(Dummy2),
      ],
      {
        skipCheck: true, //to avoid QueryRoot type must be provided error
      },
    );
    expect(printSchema(schema)).toMatchSnapshot();
  });
});
