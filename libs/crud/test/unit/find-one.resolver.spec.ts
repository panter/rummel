import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
  Resolver,
} from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';
import { FindOneResolver } from '../../src';
import { User } from '../fixtures/user.entity';

@Resolver(() => User)
export class FindOneUserResolver extends FindOneResolver(User) {}

describe('FindOneResolver', () => {
  let app: TestingModule;

  beforeAll(async () => {
    app = await Test.createTestingModule({
      imports: [GraphQLSchemaBuilderModule],
    }).compile();
  });

  it('should generate graphql schema for FindOneUserResolver', async () => {
    const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
    const schema = await gqlSchemaFactory.create([FindOneUserResolver], {
      skipCheck: true, //to avoid QueryRoot type must be provided error
    });
    // console.log(printSchema(schema));
    // expect(printSchema(schema)).toEqual(FIND_ONE_USER_GQL_SCHEMA);
  });
});
