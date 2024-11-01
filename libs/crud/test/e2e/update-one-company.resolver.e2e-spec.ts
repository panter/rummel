import { Query, Resolver } from '@nestjs/graphql';
import request from 'supertest';
import { UpdateOneResolver } from '../../src';
import { Company } from '../fixtures/company.entity';
import { User } from '../fixtures/user.entity';
import {
  afterEachCallback,
  beforeEachCallback,
  TEST_TIMEOUT,
  TestContext,
} from './utils';
import { StartedPostgreSqlContainer } from '@testcontainers/postgresql';
import { pgContainer } from './test-setup';

jest.useRealTimers();

const gql = '/graphql';

@Resolver(() => Company)
export class UpdateOneCompanyResolver extends UpdateOneResolver(Company) {
  @Query(() => String)
  updateOneCompanyResolverQuery() {
    return 'dummy';
  }
}

describe('UpdateOneCompany', () => {
  jest.setTimeout(TEST_TIMEOUT);

  let context: TestContext;

  beforeEach(async () => {
    context = await beforeEachCallback([UpdateOneCompanyResolver]);
  });

  afterEach(async () => {
    return afterEachCallback(context);
  });

  it(
    'should update company',
    async () => {
      const httpServer = context.app.getHttpServer();
      const em = context.orm.em.fork();

      const gor = em.create(User, {
        name: 'gor',
        address: { street: 'street' },
      });
      await em.persistAndFlush(gor);

      const panter = em.create(Company, {
        name: 'panter',
        description: 'yeah',
        founder: { name: 'cro', address: { street: 'street' } },
        cto: gor,
      });
      const psc = em.create(User, {
        name: 'psc',
        address: { street: 'street' },
      });
      await em.persistAndFlush(panter);
      await em.persistAndFlush(psc);

      await request(httpServer)
        .post(gql)
        .set('Accept', 'application/json')
        .send({
          query: `mutation UpdateOneCompany($data: CompanyUpdateInput, $where: EntityIdInput!) {
            updateOneCompany(where:$where data: $data) {
              name
              description
              founder {
                name
              },
              ceo {
                name
              }
              cto {
                name
              }
            }
          }`,
          variables: {
            where: { id: panter.id },
            data: {
              ceo: {
                connect: { id: psc.id },
              },
              cto: {
                create: { name: 'rog' },
              },
            },
          },
          operationName: 'UpdateOneCompany',
        })
        .expect(200)
        .expect((res) => expect(res.error).toBeFalsy())
        .expect((res) => {
          expect(res.body.data.updateOneCompany).toMatchSnapshot();
        });
    },
    TEST_TIMEOUT,
  );
});
