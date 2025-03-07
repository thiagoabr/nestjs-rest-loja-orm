import { Injectable } from '@nestjs/common';
import { CriaRoleDto } from './dto/CriaRole.dto';
import { AtualizaRoleDto } from './dto/AtualizaRole.dto';

@Injectable()
export class RoleService {
  create(criaRoleDto: CriaRoleDto) {
    return 'This action adds a new role';
  }

  findAll() {
    return `This action returns all role`;
  }

  findOne(id: number) {
    return `This action returns a #${id} role`;
  }

  update(id: number, atualizaRoleDto: AtualizaRoleDto) {
    return `This action updates a #${id} role`;
  }

  remove(id: number) {
    return `This action removes a #${id} role`;
  }
}
