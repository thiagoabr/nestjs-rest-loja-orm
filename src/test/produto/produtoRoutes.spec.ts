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

describe('GET em /produtos', () => {
  it('Deve retornar a lista de produtos', async () => {
    await request(app).get('/produtos').expect(200);
  });
});

let idResposta;
describe('POST em /produtos', () => {
  it('Deve criar um produto', async () => {
    const resposta = await request(app)
      .post('/produtos')
      .send({
        usuarioId: '0f649bc0-05a8-485a-92d7-93c54e1c1621',
        nome: 'Produto Teste',
        valor: 44.0,
        quantidade: 10,
        descricao: 'Produto novo, bem acabado, alegria para colecionadores',
        caracteristicas: [
          {
            nome: 'Fabricante',
            descricao: 'TESTE',
          },
          {
            nome: 'material',
            descricao: 'Plástico',
          },
          {
            nome: 'Pintura',
            descricao: 'manual',
          },
        ],
        imagens: [
          {
            url: 'https://i.imgur.com/dwDZICq.jpg',
            descricao: 'Imagem do Homem de De Ferro',
          },
        ],
        fornecedorId: 'e1372267-5581-4b87-94e1-801d99c436a9',
        categoria: 'Colecionáveis',
      })
      .expect(201);

    idResposta = resposta.body.content.id;
  });
});

describe('GET em /produtos/id', () => {
  it('Deve retornar produto selecionado', async () => {
    await request(app).get(`/produtos/${idResposta}`).expect(200);
  });
});
