import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FornecedorEntity } from './fornecedor.entity';
import { FornecedorService } from './fornecedor.service';
import { FornecedorController } from './fornecedor.controller';
import { ProdutoEntity } from 'src/modulos/produto/produto.entity';

@Module({
  imports: [TypeOrmModule.forFeature([FornecedorEntity, ProdutoEntity])],
  providers: [FornecedorService],
  controllers: [FornecedorController],
  exports: [FornecedorService],
})
export class FornecedorModule {}
