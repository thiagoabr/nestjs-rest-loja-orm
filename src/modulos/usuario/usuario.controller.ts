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
import { AtualizaUsuarioDTO } from './dto/AtualizaUsuario.dto';
import { CriaUsuarioDTO } from './dto/CriaUsuario.dto';
import { ListaUsuarioDTO } from './dto/ListaUsuario.dto';
import { UsuarioService } from './usuario.service';
import { HashearSenhaPipe } from 'src/recursos/pipes/hashear-senha.pipe';

@Controller('/usuarios')
export class UsuarioController {
  constructor(private usuarioService: UsuarioService) {}

  @Post()
  async criaUsuario(
    @Body() { senha, ...dadosDoUsuario }: CriaUsuarioDTO,
    @Body('senha', HashearSenhaPipe) senhaHasheada: string,
  ) {
    const usuarioCriado = await this.usuarioService.criaUsuario({
      ...dadosDoUsuario,
      senha: senhaHasheada,
    });

    return {
      usuario: new ListaUsuarioDTO(usuarioCriado.id, usuarioCriado.nome),
      messagem: 'usuário criado com sucesso',
    };
  }

  @Get()
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
