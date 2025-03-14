import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
  UseInterceptors,
} from '@nestjs/common';
import { AtualizaProdutoDTO } from './dto/atualizaProduto.dto';
import { CriaProdutoDTO } from './dto/CriaProduto.dto';
import { ProdutoService } from './produto.service';
import { ProdutoEntity } from './produto.entity';
import { CacheInterceptor, CacheTTL } from '@nestjs/cache-manager';

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
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(60 * 1000)
  async listaTodos(
    @Query('pagina') pagina: string,
    @Query('limite') limite: string,
  ) {
    try {
      if (pagina && limite) {
        const numeroPagina = parseInt(pagina, 10);
        const numeroLimite = parseInt(limite, 10);
        return this.produtoService.getProdutosPaginados(
          numeroPagina,
          numeroLimite,
        );
      }
      return this.produtoService.listProdutos();
    } catch (error) {
      throw new BadRequestException('Erro ao listar produtos');
    }
  }

  @Get('/:id')
  @UseInterceptors(CacheInterceptor)
  async listaProdutoPorId(@Param('id') id: string) {
    try {
      console.log('Buscando pelo BD');
      return await this.produtoService.listaProdutosPorId(id);
    } catch (error) {
      throw new BadRequestException(`Erro ao buscar produto ${id}`);
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
