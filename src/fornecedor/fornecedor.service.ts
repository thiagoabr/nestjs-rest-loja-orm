import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FornecedorEntity } from './fornecedor.entity';
import { AtualizaFornecedorDTO } from './dto/AtualizaFornecedor.dto';
import { ProdutoEntity } from 'src/produto/produto.entity';

@Injectable()
export class FornecedorService {
  constructor(
    @InjectRepository(FornecedorEntity)
    private readonly fornecedorRepository: Repository<FornecedorEntity>,

    @InjectRepository(ProdutoEntity)
    private readonly produtoRepository: Repository<ProdutoEntity>,
  ) {}

  async listarFornecedores(): Promise<FornecedorEntity[]> {
    return this.fornecedorRepository.find({ relations: ['produtos'] });
  }

  async criarFornecedor(
    fornecedor: FornecedorEntity,
  ): Promise<FornecedorEntity> {
    return this.fornecedorRepository.save(fornecedor);
  }

  async atualizaFornecedor(id: string, novosDados: AtualizaFornecedorDTO) {
    const entityName = await this.fornecedorRepository.findOneBy({ id });
    Object.assign(entityName, novosDados);
    return await this.fornecedorRepository.save(entityName);
  }

  async deletaFornecedor(id: string): Promise<void> {
    const fornecedor = await this.fornecedorRepository.findOne({
      where: { id },
    });
    if (!fornecedor) {
      throw new NotFoundException('Fornecedor não encontrado.');
    }

    const produtosAssociados = await this.produtoRepository.count({
      where: { fornecedor: { id } },
    });

    if (produtosAssociados > 0) {
      throw new BadRequestException(
        'Não é possível excluir o fornecedor, pois existem produtos associados a ele.',
      );
    }

    await this.fornecedorRepository.delete(id);
  }
}
