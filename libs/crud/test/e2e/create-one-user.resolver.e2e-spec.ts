import { Query, Resolver } from '@nestjs/graphql';
import request from 'supertest';
import { CreateOneResolver } from '../../src';
import { User } from '../fixtures/user.entity';
import {
  TEST_TIMEOUT,
  TestContext,
  afterAllCallback,
  beforeAllCallback,
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

  beforeAll(async () => {
    context = await beforeAllCallback([CreateOneUserResolver]);
  });

  afterAll(async () => {
    return afterAllCallback(context);
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
            }
          }`,
        variables: { data: { name: 'bbl' } },
        operationName: 'CreateOneUser',
      })
      .expect(200)
      .expect((res) => expect(res.error).toBeFalsy())
      .expect((res) => {
        expect(res.body.data.createOneUser).toMatchSnapshot();
      });
  }, 60000);
});
