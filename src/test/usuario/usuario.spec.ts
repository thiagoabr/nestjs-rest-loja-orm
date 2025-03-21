import { UsuarioEntity } from '../../modulos/usuario/usuario.entity';
import { describe, expect, it } from '@jest/globals';

describe('Testando o modelo de Usuário', () => {
  let usuario: UsuarioEntity;

  beforeEach(() => {
    usuario = new UsuarioEntity();
    usuario.id = 'uuid-usuario';
    usuario.nome = 'Usuario Teste';
    usuario.email = 'teste@teste.com';
    usuario.senha = 'Abc@123';
    usuario.createdAt = new Date().toISOString();
    usuario.updatedAt = new Date().toISOString();
    usuario.pedidos = [];
  });

  it('Deve ser definido', () => {
    expect(usuario).toBeDefined();
  });

  it('Deve ter um ID', () => {
    expect(usuario.id).toBe('uuid-usuario');
  });

  it('Deve ter um nome', () => {
    expect(usuario.nome).toBe('Usuario Teste');
  });

  it('Deve ter um email válido', () => {
    expect(usuario.email).toBe('teste@teste.com');
  });

  it('Deve ter uma senha', () => {
    expect(usuario.senha).toBe('Abc@123');
  });

  it('Deve ter timestamps válidos', () => {
    expect(new Date(usuario.createdAt).toISOString()).toBe(usuario.createdAt);
    expect(new Date(usuario.updatedAt).toISOString()).toBe(usuario.updatedAt);
  });

  it('Deve permitir pedidos', () => {
    expect(usuario.pedidos).toBeInstanceOf(Array);
  });
});
