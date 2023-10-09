import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
  Resolver,
} from '@nestjs/graphql';
import { printSchema } from 'graphql/utilities';
import { Test, TestingModule } from '@nestjs/testing';
import { FindOneResolver, ObjectRelationResolvers } from '../../src';
import { Group } from '../fixtures/group.entity';
import { OBJECT_RELATIONS_GROUP_GQL_SCHEMA } from './fixtures/object-relation-resolver.fixtures';

@Resolver(() => Group)
export class FindOneGroupResolver extends FindOneResolver(Group) {}

describe('ObjectRelationResolver', () => {
  let app: TestingModule;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [GraphQLSchemaBuilderModule],
    }).compile();
  });

  it('should generate relation resolvers graphql schema for Group object', async () => {
    const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
    const schema = await gqlSchemaFactory.create(
      [FindOneGroupResolver, ...ObjectRelationResolvers(Group)],
      {
        skipCheck: true, //to avoid QueryRoot type must be provided error
      },
    );
    expect(printSchema(schema)).toEqual(OBJECT_RELATIONS_GROUP_GQL_SCHEMA);
  });
});
