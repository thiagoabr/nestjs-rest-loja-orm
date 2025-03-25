import * as request from 'supertest';
import { describe, expect, it, beforeAll, afterAll } from '@jest/globals';
import { INestApplication } from '@nestjs/common';
import { bootstrap } from '../../main';
import { UsuarioEntity } from '../../modulos/usuario/usuario.entity';

let app: INestApplication;

beforeAll(async () => {
  app = await bootstrap();
  await app.init();
});

afterAll(async () => {
  await app.close();
});

describe('GET em /usuarios', () => {
  it('Deve retornar a lista de recursos', async () => {
    await request(app.getHttpServer()).get('/usuarios').expect(200);
  });
});

describe('POST em /usuarios', () => {
  it('Deve criar um novo usuários', async () => {
    const retorno = await request(app.getHttpServer())
      .post('/usuarios')
      .send({
        nome: 'Alura',
        email: 'alura@alura.com.br',
        senha: 'alura123456',
      })
      .expect(201);

    console.log(retorno.body);
  });
});

describe('Model de usuario', () => {
  it('Deve criar uma instancia de usuario', async () => {
    const dadosUsuario = {
      nome: 'Alura',
      email: 'alura@alura.com',
      senha: 'alura123456',
    };

    const usuario = new UsuarioEntity(
      dadosUsuario.email,
      dadosUsuario.nome,
      dadosUsuario.senha,
    );

    expect(usuario).toEqual(expect.objectContaining(dadosUsuario));
  });
});
