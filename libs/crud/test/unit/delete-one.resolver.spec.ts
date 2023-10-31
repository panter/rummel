import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
  Resolver,
} from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';
import { printSchema } from 'graphql/utilities';
import { DeleteOneResolver } from '../../src';
import { User } from '../fixtures/user.entity';

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
    expect(printSchema(schema)).toMatchSnapshot();
  });
});
