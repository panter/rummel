import { Query, Resolver } from '@nestjs/graphql';
import request from 'supertest';
import { CreateOneResolver } from '../../src';
import { Company } from '../fixtures/company.entity';
import { User } from '../fixtures/user.entity';
import {
  TEST_TIMEOUT,
  TestContext,
  afterEachCallback,
  beforeEachCallback,
} from './utils';

jest.useRealTimers();

const gql = '/graphql';

@Resolver(() => Company)
export class CreateOneCompanyResolver extends CreateOneResolver(Company) {
  @Query(() => String)
  createOneCompanyResolver() {
    return 'dummy';
  }
}

describe('CreateOneCompany', () => {
  jest.setTimeout(TEST_TIMEOUT);

  let context: TestContext;

  beforeEach(async () => {
    context = await beforeEachCallback([CreateOneCompanyResolver]);
  });

  afterEach(async () => {
    return afterEachCallback(context);
  });

  it(
    'should create company',
    async () => {
      const httpServer = context.app.getHttpServer();
      const em = context.orm.em.fork();

      const cro = em.create(User, { name: 'cro' });
      const bbl = em.create(User, { name: 'bbl' });
      await em.persistAndFlush(cro);
      await em.persistAndFlush(bbl);

      await request(httpServer)
        .post(gql)
        .set('Accept', 'application/json')
        .send({
          query: `mutation CreateOneCompany($data: CompanyCreateInput) {
            createOneCompany(data: $data) {
              name
              description
              founder {
                name
              }
            }
          }`,
          variables: {
            data: {
              name: 'manul',
              founder: {
                connect: { id: bbl.id },
              },
            },
          },
          operationName: 'CreateOneCompany',
        })
        .expect(200)
        .expect((res) => expect(res.error).toBeFalsy())
        .expect((res) => {
          expect(res.body.data.createOneCompany).toMatchSnapshot();
        });
    },
    TEST_TIMEOUT,
  );
});
