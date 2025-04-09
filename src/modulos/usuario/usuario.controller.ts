import {
  BadRequestException,
  Body,
  CacheTTL,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { UsuarioService } from './usuario.service';
import { HashearSenhaPipe } from '../../recursos/pipes/hashear-senha.pipe';
import { CacheInterceptor } from '@nestjs/cache-manager';
import { AutenticacaoGuard } from '../autenticacao/autenticacao.guard';

@UseGuards(AutenticacaoGuard)
@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Post()
  async criaUsuario(
    @Body() { senha, ...dadosDoUsuario }: CriaUsuarioDTO,
    @Body('senha', HashearSenhaPipe) senhaHasheada: string,
  ) {
    try {
      const usuarioCriado = await this.usuarioService.criaUsuario({
        ...dadosDoUsuario,
        senha: senhaHasheada,
      });

      return {
        messagem: 'usuário criado com sucesso',
        usuario: new ListaUsuarioDTO(
          usuarioCriado.id,
          usuarioCriado.nome,
          usuarioCriado.email,
        ),
      };
    } catch (error) {
      throw new BadRequestException('Erro ao criar usuário');
    }
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheTTL(15 * 1000)
  async listUsuarios() {
    try {
      const usuariosSalvos = await this.usuarioService.listUsuarios();
      return usuariosSalvos;
    } catch (error) {
      throw new BadRequestException('Erro ao buscar usuários');
    }
  }

  @Put('/:id')
  async atualizaUsuario(
    @Param('id') id: string,
    @Body() novosDados: AtualizaUsuarioDTO,
  ) {
    try {
      const usuarioAtualizado = await this.usuarioService.atualizaUsuario(
        id,
        novosDados,
      );

      return {
        usuario: usuarioAtualizado,
        messagem: 'usuário atualizado com sucesso',
      };
    } catch (error) {
      throw new BadRequestException('Erro ao atualizar usuário');
    }
  }

  @Delete('/:id')
  async removeUsuario(@Param('id') id: string) {
    try {
      const usuarioRemovido = await this.usuarioService.deletaUsuario(id);

      return {
        usuario: usuarioRemovido,
        messagem: 'usuário removido com suceso',
      };
    } catch (error) {
      throw new BadRequestException('Erro ao excluir usuário');
    }
  }
}
