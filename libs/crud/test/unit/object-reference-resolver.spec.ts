import {
  GraphQLSchemaBuilderModule,
  GraphQLSchemaFactory,
  Resolver,
} from '@nestjs/graphql';
import { Test, TestingModule } from '@nestjs/testing';
import { printSchema } from 'graphql/utilities';
import { FindOneResolver, ObjectReferenceResolvers } from '../../src';
import { Company } from '../fixtures/company.entity';
import { Group } from '../fixtures/group.entity';

@Resolver(() => Group)
export class FindOneGroupResolver extends FindOneResolver(Group) {}

@Resolver(() => Company)
export class FindOneCompanyResolver extends FindOneResolver(Company) {}

describe('ObjectReferenceResolver', () => {
  let app: TestingModule;

  beforeEach(async () => {
    app = await Test.createTestingModule({
      imports: [GraphQLSchemaBuilderModule],
    }).compile();
  });

  it('should generate reference resolvers graphql schema', async () => {
    const gqlSchemaFactory = app.get(GraphQLSchemaFactory);
    const schema = await gqlSchemaFactory.create(
      [
        FindOneGroupResolver,
        ...ObjectReferenceResolvers(Group),
        FindOneCompanyResolver,
        ...ObjectReferenceResolvers(Company),
      ],
      {
        skipCheck: true, //to avoid QueryRoot type must be provided error
      },
    );
    expect(printSchema(schema)).toMatchSnapshot();
  });
});
