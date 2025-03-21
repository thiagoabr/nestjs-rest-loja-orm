import { ProdutoEntity } from '../../modulos/produto/produto.entity';
import { FornecedorEntity } from 'src/modulos/fornecedor/fornecedor.entity';
import { describe, expect, it } from '@jest/globals';

describe('Testando o modelo de Produto', () => {
  let produto: ProdutoEntity;

  beforeEach(() => {
    produto = new ProdutoEntity();
    produto.id = 'uuid-produto';
    produto.nome = 'Produto Teste';
    produto.valor = 100.5;
    produto.quantidade = 10;
    produto.descricao = 'Descrição do produto teste';
    produto.categoria = 'Categoria Teste';
    produto.createdAt = new Date().toISOString();
    produto.updatedAt = new Date().toISOString();
    produto.deletedAt = null;
    produto.imagens = [];
    produto.caracteristicas = [];
    produto.fornecedor = new FornecedorEntity();
    produto.itensPedido = [];
  });

  it('deve ser definido', () => {
    expect(produto).toBeDefined();
  });

  it('deve ter um ID', () => {
    expect(produto.id).toBe('uuid-produto');
  });

  it('deve ter um nome', () => {
    expect(produto.nome).toBe('Produto Teste');
  });

  it('deve ter um valor válido', () => {
    expect(produto.valor).toBe(100.5);
  });

  it('deve ter uma quantidade disponível', () => {
    expect(produto.quantidade).toBe(10);
  });

  it('deve ter uma descrição', () => {
    expect(produto.descricao).toBe('Descrição do produto teste');
  });

  it('deve ter uma categoria', () => {
    expect(produto.categoria).toBe('Categoria Teste');
  });

  it('Deve ter timestamps válidos', () => {
    expect(new Date(produto.createdAt).toISOString()).toBe(produto.createdAt);
    expect(new Date(produto.updatedAt).toISOString()).toBe(produto.updatedAt);
  });

  it('Deve permitir imagens', () => {
    expect(produto.imagens).toBeInstanceOf(Array);
  });

  it('Deve permitir características', () => {
    expect(produto.caracteristicas).toBeInstanceOf(Array);
  });

  it('Deve permitir um fornecedor associado', () => {
    expect(produto.fornecedor).toBeDefined();
  });

  it('Deve permitir itens de pedido', () => {
    expect(produto.itensPedido).toBeInstanceOf(Array);
  });
});
