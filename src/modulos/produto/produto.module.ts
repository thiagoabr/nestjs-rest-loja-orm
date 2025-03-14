import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoService } from './produto.service';
import { ProdutoController } from './produto.controller';
import { ProdutoEntity } from './produto.entity';
import { FornecedorEntity } from '../fornecedor/fornecedor.entity';
import { ProdutoRepository } from './produto.repository';

@Module({
  imports: [TypeOrmModule.forFeature([ProdutoEntity, FornecedorEntity])],
  providers: [ProdutoService, ProdutoRepository],
  controllers: [ProdutoController],
  exports: [ProdutoService, ProdutoRepository],
})
export class ProdutoModule {}
