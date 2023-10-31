import { Resolver, Query } from '@nestjs/graphql';
import request from 'supertest';
import { UpdateOneResolver } from '../../src';
import { Group } from '../fixtures/group.entity';
import { User } from '../fixtures/user.entity';
import {
  TEST_TIMEOUT,
  TestContext,
  afterAllCallback,
  beforeAllCallback,
} from './utils';

jest.useRealTimers();

const gql = '/graphql';

@Resolver(() => Group)
export class UpdateOneGroupResolver extends UpdateOneResolver(Group) {
  @Query(() => String)
  updateOneGroupResolverQuery() {
    return 'dummy';
  }
}

describe('UpdateOneGroup', () => {
  jest.setTimeout(TEST_TIMEOUT);
  let context: TestContext;

  beforeAll(async () => {
    context = await beforeAllCallback([UpdateOneGroupResolver]);
  });

  afterAll(async () => {
    return afterAllCallback(context);
  });

  it('should update group', async () => {
    const httpServer = context.app.getHttpServer();
    const em = context.orm.em.fork();

    const gor = em.create(User, { name: 'gor' });
    const csp = em.create(User, { name: 'csp' });
    await em.persistAndFlush(gor);
    await em.persistAndFlush(csp);

    const manul = em.create(Group, {
      name: 'manul',
      description: 'yeah',
      founders: [{ name: 'cro' }, { name: 'bbl' }],
      coordinator: [csp],
      finance: [gor],
    });
    const psc = em.create(User, { name: 'psc' });
    const maw = em.create(User, { name: 'maw' });
    await em.persistAndFlush(manul);
    await em.persistAndFlush(psc);
    await em.persistAndFlush(maw);

    await request(httpServer)
      .post(gql)
      .set('Accept', 'application/json')
      .send({
        query: `mutation UpdateOneGroup($data: GroupUpdateInput, $where: EntityIdInput!) {
            updateOneGroup(where:$where data: $data) {
              name
              description
              founders {
                name
              },
              coordinator {
                name
              }
              finance {
                name
              }
            }
          }`,
        variables: {
          where: { id: manul.id },
          data: {
            description: { set: 'yeah' },
            coordinator: {
              connect: [{ id: psc.id }, { id: maw.id }],
              disconnect: [{ id: csp.id }],
            },
            finance: {
              create: [{ name: 'rog' }],
              connect: [{ id: psc.id }],
              disconnect: [{ id: gor.id }],
            },
          },
        },
        operationName: 'UpdateOneGroup',
      })
      .expect(200)
      .expect((res) => expect(res.error).toBeFalsy())
      .expect((res) => {
        expect(res.body.data.updateOneGroup).toMatchSnapshot();
      });
  }, 60000);
});
