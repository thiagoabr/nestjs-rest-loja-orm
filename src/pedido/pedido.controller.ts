import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  BadRequestException,
  Query,
} from '@nestjs/common';
import { PedidoService } from './pedido.service';

@Controller('pedidos')
export class PedidoController {
  constructor(private readonly pedidoService: PedidoService) {}

  @Post()
  criaPedido(@Query('usuarioId') usuarioId: string) {
    try {
      return this.pedidoService.cadastraPedido(usuarioId);
    } catch (error) {
      throw new BadRequestException('Erro ao cadastrar pedido');
    }
  }

  @Get()
  listarProdutos() {
    try {
      return this.pedidoService.listarPedidos();
    } catch (error) {
      throw new BadRequestException('Erro ao listar pedidos');
    }
  }

  @Get()
  listarPedidosByUsuario(@Query('usuarioId') usuarioId: string) {
    try {
      return this.pedidoService.listarPedidosByUsuario(usuarioId);
    } catch (error) {
      throw new BadRequestException('Erro ao listar pedidos');
    }
  }
}
