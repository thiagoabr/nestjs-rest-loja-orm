import {
  ConflictException,
  Injectable,
  InternalServerErrorException,
} from '@nestjs/common';
import { CriaRoleDto } from './dto/CriaRole.dto';
import { RoleEntity } from './role.entity';
import { QueryFailedError, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(RoleEntity)
    private readonly roleRepository: Repository<RoleEntity>,
  ) {}

  async criaRole(dadosRole: CriaRoleDto) {
    try {
      const roleEntity = new RoleEntity();

      Object.assign(roleEntity, dadosRole as RoleEntity);

      const roleExistente = await this.roleRepository.findOne({
        where: { id: dadosRole.nome },
      });

      if (roleExistente) {
        throw new ConflictException('Role já cadastrada!');
      }

      return this.roleRepository.save(roleEntity);
    } catch (error) {
      if (error instanceof QueryFailedError) {
        throw new InternalServerErrorException(
          'Erro no banco de dados. Tente novamente mais tarde.',
        );
      }
      throw error;
    }
  }
}
