import { Entity, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { UsuarioEntity } from '../../modulos/usuario/usuario.entity';
import { RoleEntity } from './role.entity';

@Entity({ name: 'usuarios_roles' })
export class UsuarioRoleEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => UsuarioEntity, (usuario) => usuario.id, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  usuario: UsuarioEntity;

  @ManyToOne(() => RoleEntity, (role) => role.id, {
    cascade: ['update'],
  })
  role: RoleEntity;
}
