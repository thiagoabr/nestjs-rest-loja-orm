import { IsNotEmpty, IsString } from 'class-validator';

export class CriaFornecedorDTO {
  @IsString()
  @IsNotEmpty({ message: 'Nome do fornecedor não pode ser vazio' })
  nome: string;

  @IsString()
  @IsNotEmpty({ message: 'Cnpj do fornecedor não pode ser vazio' })
  cnpj: string;
}
