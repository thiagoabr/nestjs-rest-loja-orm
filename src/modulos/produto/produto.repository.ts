import { Repository } from 'typeorm';
import { ProdutoEntity } from './produto.entity';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ProdutoRepository {
  constructor(
    @InjectRepository(ProdutoEntity)
    private readonly repository: Repository<ProdutoEntity>,
  ) {}

  async findByCategoria(categoria: string): Promise<ProdutoEntity[]> {
    return this.repository.find({
      where: { categoria },
    });
  }
}
