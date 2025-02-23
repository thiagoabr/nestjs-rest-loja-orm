import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FornecedorEntity } from './fornecedor.entity';
import { FornecedorService } from './fornecedor.service';
import { FornecedorController } from './fornecedor.controller';

@Module({
  imports: [TypeOrmModule.forFeature([FornecedorEntity])],
  providers: [FornecedorService],
  controllers: [FornecedorController],
  exports: [FornecedorService],
})
export class FornecedorModule {}
