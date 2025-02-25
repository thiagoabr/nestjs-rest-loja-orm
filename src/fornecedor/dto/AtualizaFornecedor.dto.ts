import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class AtualizaFornecedorDTO {
  @IsString()
  @IsNotEmpty({ message: 'Nome do fornecedor não pode ser vazio' })
  @IsOptional()
  nome: string;

  @IsString()
  @IsNotEmpty({ message: 'Cnpj do fornecedor não pode ser vazio' })
  @IsOptional()
  cnpj: string;
}
