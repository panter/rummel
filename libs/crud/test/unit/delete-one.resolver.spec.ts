import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
  Resolver,
} from '@nestjs/graphql';
import { printSchema } from 'graphql/utilities';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../fixtures/user.entity';
import { DeleteOneResolver } from '../../src';
import { DELETE_ONE_USER_GQL_SCHEMA } from './fixtures/delete-one.resolver.fixtures';

@Resolver(() => User)
export class DeleteOneUserResolver extends DeleteOneResolver(User) {}

describe('DeleteOneResolver', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [GraphQLSchemaBuilderModule],
    }).compile();
  });

  it('should generate graphql schema for DeleteOneUserResolver', async () => {
    const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
    const schema = await gqlSchemaFactory.create([DeleteOneUserResolver], {
      skipCheck: true, //to avoid QueryRoot type must be provided error
    });
    // console.log(printSchema(schema));
    expect(printSchema(schema)).toEqual(DELETE_ONE_USER_GQL_SCHEMA);
  });
});