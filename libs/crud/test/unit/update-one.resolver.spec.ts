import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
  Resolver,
} from '@nestjs/graphql';
import { printSchema } from 'graphql/utilities';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../fixtures/user.entity';
import { UpdateOneResolver } from '../../src';
import { UPDATE_ONE_USER_GQL_SCHEMA } from './fixtures/update-one.resolver.fixtures';

@Resolver(() => User)
export class UpdateOneUserResolver extends UpdateOneResolver(User) {}

describe('UpdateOneResolver', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [GraphQLSchemaBuilderModule],
    }).compile();
  });

  it('should generate graphql schema for UpdateOneUserResolver', async () => {
    const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
    const schema = await gqlSchemaFactory.create([UpdateOneUserResolver], {
      skipCheck: true, //to avoid QueryRoot type must be provided error
    });
    // console.log(printSchema(schema));
    expect(printSchema(schema)).toEqual(UPDATE_ONE_USER_GQL_SCHEMA);
  });
});