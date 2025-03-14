import { Controller, Get, Post, Body } from '@nestjs/common';
import { RoleService } from './role.service';
import { CriaRoleDto } from './dto/CriaRole.dto';

@Controller('roles')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Post()
  async criaRole(@Body() dadosRole: CriaRoleDto) {
    const roleCriado = await this.roleService.criaRole(dadosRole);

    return {
      usuario: roleCriado.id,
      messagem: 'usuário criado com sucesso',
    };
  }
}
