import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
  Resolver,
} from '@nestjs/graphql';
import { printSchema } from 'graphql/utilities';
import { Test, TestingModule } from '@nestjs/testing';
import { User } from '../fixtures/user.entity';
import { CreateOneResolver } from '../../src';
import { CREATE_ONE_USER_GQL_SCHEMA } from './fixtures/create-one.resolver.fixtures';

@Resolver(() => User)
export class CreateOneUserResolver extends CreateOneResolver(User) {}

describe('CreateOneResolver', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [GraphQLSchemaBuilderModule],
    }).compile();
  });

  it('should generate graphql schema for CreateOneUserResolver', async () => {
    const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
    const schema = await gqlSchemaFactory.create([CreateOneUserResolver], {
      skipCheck: true, //to avoid QueryRoot type must be provided error
    });
    expect(printSchema(schema)).toEqual(CREATE_ONE_USER_GQL_SCHEMA);
  });
});