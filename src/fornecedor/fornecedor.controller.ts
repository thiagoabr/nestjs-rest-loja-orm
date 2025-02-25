import {
  Controller,
  Get,
  Post,
  Body,
  BadRequestException,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { FornecedorService } from './fornecedor.service';
import { FornecedorEntity } from './fornecedor.entity';
import { CriaFornecedorDTO } from './dto/CriaFornecedor.dto';
import { randomUUID } from 'crypto';
import { AtualizaFornecedorDTO } from './dto/AtualizaFornecedor.dto';

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

  @Put('/:id')
  async atualiza(
    @Param('id') id: string,
    @Body() dadosFornecedor: AtualizaFornecedorDTO,
  ) {
    try {
      const fornecedorAlterado =
        await this.fornecedorService.atualizaFornecedor(id, dadosFornecedor);
      return {
        mensagem: `Fornecedor ${fornecedorAlterado.nome}, atualizado com sucesso`,
      };
    } catch (error) {
      throw new BadRequestException('Erro ao atualizar fornecedor');
    }
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    try {
      const fornecedorRemovido = await this.fornecedorService.deletaFornecedor(
        id,
      );
      return {
        mensagem: 'Fornecedor removido com sucesso',
        produto: fornecedorRemovido,
      };
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }
}
