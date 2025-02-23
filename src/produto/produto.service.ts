import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ListaProdutoDTO } from './dto/ListaProduto.dto';
import { ProdutoEntity } from './produto.entity';
import { Repository } from 'typeorm';
import { AtualizaProdutoDTO } from './dto/AtualizaProduto.dto';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { FornecedorEntity } from 'src/fornecedor/fornecedor.entity';
import { ProdutoRepository } from './produto.repository';

@Injectable()
export class ProdutoService {
  constructor(
    @InjectRepository(ProdutoEntity)
    private produtoRepository: Repository<ProdutoEntity>,

    private readonly produtosRepository: ProdutoRepository,

    @InjectRepository(FornecedorEntity)
    private fornecedorRepository: Repository<FornecedorEntity>,
  ) {}

  async criaProduto(produtoDto: CriaProdutoDTO) {
    const fornecedor = await this.fornecedorRepository.findOne({
      where: { id: produtoDto.fornecedorId },
    });
    if (!fornecedor) {
      throw new NotFoundException('Fornecedor não encontrado');
    }
    const produto = this.produtoRepository.create({
      ...produtoDto,
      fornecedor,
    });

    return await this.produtoRepository.save(produto);
  }

  async listProdutos() {
    const produtosSalvos = await this.produtoRepository.find({
      relations: {
        imagens: true,
        caracteristicas: true,
        fornecedor: true,
      },
    });
    const produtosLista = produtosSalvos.map(
      (produto) =>
        new ListaProdutoDTO(
          produto.id,
          produto.nome,
          produto.caracteristicas,
          produto.imagens,
        ),
    );
    return produtosLista;
  }

  async atualizaProduto(id: string, novosDados: AtualizaProdutoDTO) {
    const entityName = await this.produtoRepository.findOneBy({ id });
    Object.assign(entityName, novosDados);
    await this.produtoRepository.save(entityName);
  }

  async deletaProduto(id: string) {
    await this.produtoRepository.delete(id);
  }

  async buscaPorCategoria(categoria: string): Promise<ProdutoEntity[]> {
    return this.produtosRepository.findByCategoria(categoria);
  }
}
