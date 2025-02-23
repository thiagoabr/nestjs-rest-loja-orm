import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FornecedorEntity } from './fornecedor.entity';

@Injectable()
export class FornecedorService {
  constructor(
    @InjectRepository(FornecedorEntity)
    private readonly fornecedorRepository: Repository<FornecedorEntity>,
  ) {}

  async listarFornecedores(): Promise<FornecedorEntity[]> {
    return this.fornecedorRepository.find({ relations: ['produtos'] });
  }

  async criarFornecedor(
    fornecedor: FornecedorEntity,
  ): Promise<FornecedorEntity> {
    return this.fornecedorRepository.save(fornecedor);
  }
}
