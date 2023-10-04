import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
  Resolver,
} from '@nestjs/graphql';
import { printSchema } from 'graphql/utilities';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../fixtures/user.entity';
import { FindManyResolver } from '../../src';
import { FIND_MANY_USER_GQL_SCHEMA } from './fixtures/find-many.resolver.fixtures';

@Resolver(() => User)
export class FindManyUserResolver extends FindManyResolver(User) {}

describe('FindManyResolver', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [GraphQLSchemaBuilderModule],
    }).compile();
  });

  it('should generate graphql schema for FindManyUserResolver', async () => {
    const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
    const schema = await gqlSchemaFactory.create([FindManyUserResolver], {
      skipCheck: true, //to avoid QueryRoot type must be provided error
    });
    expect(printSchema(schema)).toEqual(FIND_MANY_USER_GQL_SCHEMA);
  });
});