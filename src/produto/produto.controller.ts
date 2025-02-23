import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AtualizaProdutoDTO } from './dto/atualizaProduto.dto';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { ProdutoService } from './produto.service';
import { ProdutoEntity } from './produto.entity';

@Controller('produtos')
export class ProdutoController {
  constructor(private readonly produtoService: ProdutoService) {}

  @Post()
  async criaNovo(@Body() dadosProduto: CriaProdutoDTO) {
    try {
      const produtoCadastrado = this.produtoService.criaProduto(dadosProduto);
      return produtoCadastrado;
    } catch (error) {
      throw new BadRequestException('Erro ao cadastrar produto');
    }
  }

  @Get()
  async listaTodos() {
    try {
      return this.produtoService.listProdutos();
    } catch (error) {
      throw new BadRequestException('Erro ao buscar produto');
    }
  }

  @Put('/:id')
  async atualiza(
    @Param('id') id: string,
    @Body() dadosProduto: AtualizaProdutoDTO,
  ) {
    try {
      const produtoAlterado = await this.produtoService.atualizaProduto(
        id,
        dadosProduto,
      );
      return {
        mensagem: 'Produto atualizado com sucesso',
        produto: produtoAlterado,
      };
    } catch (error) {
      throw new BadRequestException('Erro ao atualizar produto');
    }
  }

  @Delete('/:id')
  async remove(@Param('id') id: string) {
    try {
      const produtoRemovido = await this.produtoService.deletaProduto(id);
      return {
        mensagem: 'Produto removido com sucesso',
        produto: produtoRemovido,
      };
    } catch (error) {
      throw new BadRequestException('Erro ao excluir produto');
    }
  }

  @Get('categoria/:categoria')
  async buscarPorCategoria(
    @Param('categoria') categoria: string,
  ): Promise<ProdutoEntity[]> {
    return this.produtoService.buscaPorCategoria(categoria);
  }
}
