import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
  Resolver,
} from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';
import { printSchema } from 'graphql/utilities';
import { FindManyResolver } from '../../src';
import { User } from '../fixtures/user.entity';

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
    expect(printSchema(schema)).toMatchSnapshot();
  });
});
