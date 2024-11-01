import { Query, Resolver } from '@nestjs/graphql';
import request from 'supertest';
import { CreateOneResolver } from '../../src';
import { User } from '../fixtures/user.entity';
import {
  TEST_TIMEOUT,
  TestContext,
  afterEachCallback,
  beforeEachCallback,
} from './utils';

jest.useRealTimers();

const gql = '/graphql';

@Resolver(() => User)
export class CreateOneUserResolver extends CreateOneResolver(User) {
  @Query(() => String)
  createOneUserResolver() {
    return 'dummy';
  }
}

describe('CreateOneUser', () => {
  jest.setTimeout(TEST_TIMEOUT);

  let context: TestContext;

  beforeEach(async () => {
    context = await beforeEachCallback([CreateOneUserResolver]);
  });

  afterEach(async () => {
    return afterEachCallback(context);
  });

  it('should create user', async () => {
    const httpServer = context.app.getHttpServer();
    await request(httpServer)
      .post(gql)
      .set('Accept', 'application/json')
      .send({
        query: `
          mutation CreateOneUser($data: UserCreateInput) {
            createOneUser(data: $data) {
              name
              address {
                street
              }
            }
          }`,
        variables: { data: { name: 'bbl', address: { street: 'my street' } } },
        operationName: 'CreateOneUser',
      })
      .expect(200)
      .expect((res) => expect(res.error).toBeFalsy())
      .expect((res) => {
        expect(res.body.data.createOneUser).toMatchSnapshot();
      });
  }, 120000);
});
