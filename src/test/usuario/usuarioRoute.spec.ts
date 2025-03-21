import request from 'supertest';
import { describe, expect, it } from '@jest/globals';
import { Test, TestingModule } from '@nestjs/testing';
import { AppModule } from '../../app.module';
import { INestApplication } from '@nestjs/common';

let app: INestApplication;
beforeAll(async () => {
  const moduleFixure: TestingModule = await Test.createTestingModule({
    imports: [AppModule],
  }).compile();

  app = moduleFixure.createNestApplication();
  await app.init();
});

afterAll(async () => {
  await app.close();
});

describe('GET em /usuarios', () => {
  it('Deve retornar a lista de usuario', async () => {
    await request(app).get('/usuarios').expect(200);
  });
});

describe('POST em /usuarios', () => {
  it('Deve criar usuario', async () => {
    await request(app)
      .post('/usuarios')
      .send({
        nome: 'Usuario Teste',
        email: 'teste@teste.com',
        senha: 'Abc@123',
      })
      .expect(201);
  });
});
