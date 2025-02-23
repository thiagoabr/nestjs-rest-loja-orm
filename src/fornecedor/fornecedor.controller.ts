import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
} from '@nestjs/common';
import { FornecedorService } from './fornecedor.service';
import { FornecedorEntity } from './fornecedor.entity';
import { CriaFornecedorDTO } from './dto/CriaFornecedor.dto';
import { randomUUID } from 'crypto';

@Controller('fornecedores')
export class FornecedorController {
  constructor(private readonly fornecedorService: FornecedorService) {}

  @Post()
  async criarFornecedor(@Body() dadosfornecedor: CriaFornecedorDTO) {
    try {
      const fornecedor = new FornecedorEntity();

      fornecedor.id = randomUUID();
      fornecedor.nome = dadosfornecedor.nome;
      fornecedor.cnpj = dadosfornecedor.cnpj;

      return this.fornecedorService.criarFornecedor(fornecedor);
    } catch (error) {
      throw new BadRequestException('Erro ao criar fornecedor');
    }
  }

  @Get()
  async listarFornecedores(): Promise<FornecedorEntity[]> {
    try {
      return this.fornecedorService.listarFornecedores();
    } catch (error) {
      throw new BadRequestException('Erro ao listar fornecedores');
    }
  }
}
