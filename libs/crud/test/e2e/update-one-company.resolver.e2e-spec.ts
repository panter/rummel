import { Query, Resolver } from '@nestjs/graphql';
import request from 'supertest';
import { UpdateOneResolver } from '../../src';
import { Company } from '../fixtures/company.entity';
import { User } from '../fixtures/user.entity';
import {
  TEST_TIMEOUT,
  TestContext,
  afterAllCallback,
  beforeAllCallback,
} from './utils';

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

  beforeAll(async () => {
    context = await beforeAllCallback([UpdateOneCompanyResolver]);
  });

  afterAll(async () => {
    return afterAllCallback(context);
  });

  it('should update company', async () => {
    const httpServer = context.app.getHttpServer();
    const em = context.orm.em.fork();

    const gor = em.create(User, { name: 'gor' });
    await em.persistAndFlush(gor);

    const panter = em.create(Company, {
      name: 'panter',
      description: 'yeah',
      founder: { name: 'cro' },
      cto: gor,
    });
    const psc = em.create(User, { name: 'psc' });
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
  }, 60000);
});
