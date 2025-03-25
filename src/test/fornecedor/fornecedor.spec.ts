import * as request from 'supertest';
import { describe, expect, it, beforeAll, afterAll } from '@jest/globals';
import { INestApplication } from '@nestjs/common';
import { bootstrap } from '../../main';

let app: INestApplication;

beforeAll(async () => {
  app = await bootstrap();
  await app.init();
});

afterAll(async () => {
  await app.close();
});

describe('GET em /fornecedor', () => {
  it('Deve retornar a lista de recursos', async () => {
    await request(app.getHttpServer()).get('/fornecedor').expect(200);
  });
});
