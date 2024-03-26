import * as request from 'supertest';
import { TestContext, afterAllCallback, beforeAllCallback } from './utils';
import { FindOneUserResolver } from '../src/app.resolver';

describe('AppController (e2e)', () => {
  let context: TestContext;

  beforeAll(async () => {
    context = await beforeAllCallback([FindOneUserResolver]);
  });

  afterAll(async () => {
    return afterAllCallback(context);
  });

  it('/ (GET)', () => {
    return request(context.app.getHttpServer()).get('/').expect(404);
  });
});
