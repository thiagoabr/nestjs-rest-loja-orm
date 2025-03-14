import {
  Controller,
  Get,
  Post,
  BadRequestException,
  UseGuards,
  Body,
  Param,
  Patch,
  Req,
} from '@nestjs/common';
import { PedidoService } from './pedido.service';
import {
  AutenticacaoGuard,
  RequisicaoComUsuario,
} from '../autenticacao/autenticacao.guard';
import { CriaPedidoDTO } from './dto/CriaPedido.dto';
import { AtualizaPedidoDto } from './dto/AtualizaPedido.dto';

@UseGuards(AutenticacaoGuard)
@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  async criaPedido(
    @Req() req: RequisicaoComUsuario,
    @Body() dadosDoPedido: CriaPedidoDTO,
  ) {
    try {
      const usuarioId = req.usuario.sub;
      const pedidoCriado = await this.pedidoService.cadastraPedido(
        usuarioId,
        dadosDoPedido,
      );

      return {
        mensagem: 'Pedido feito com sucesso.',
        pedido: pedidoCriado,
      };
    } catch (error) {
      throw new BadRequestException('Erro ao cadastrar pedido');
    }
  }

  @Get()
  async obtemPedidosDeUsuario(@Req() req: RequisicaoComUsuario) {
    try {
      const usuarioId = req.usuario.sub;
      const pedidos = await this.pedidoService.obtemPedidosDeUsuario(usuarioId);
      return {
        mensagem: 'Pedidos obtidos com sucesso.',
        pedidos,
      };
    } catch (error) {
      throw new BadRequestException('Erro ao listar pedidos');
    }
  }

  @Patch(':id')
  async atualizaPedido(
    @Req() req: RequisicaoComUsuario,
    @Param('id') pedidoId: string,
    @Body() dadosDeAtualizacao: AtualizaPedidoDto,
  ) {
    try {
      const usuarioId = req.usuario.sub;
      const pedidoAtualizado = await this.pedidoService.atualizaPedido(
        pedidoId,
        dadosDeAtualizacao,
        usuarioId,
      );
      return pedidoAtualizado;
    } catch (error) {
      throw new BadRequestException('Erro ao atualizar pedido');
    }
  }
}
