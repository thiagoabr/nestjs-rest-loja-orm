import { IsNotEmpty } from 'class-validator';

export class CriaRoleDto {
  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  nome: string;

  @IsNotEmpty({ message: 'O nome não pode ser vazio' })
  descricao: string;
}
