import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { ProdutoEntity } from '.././produto/produto.entity';

@Entity({ name: 'fornecedores' })
export class FornecedorEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'nome', length: 100, nullable: false })
  nome: string;

  @Column({ name: 'cnpj', length: 50, nullable: false })
  cnpj: string;

  @OneToMany(() => ProdutoEntity, (produtos) => produtos.fornecedor, {
    orphanedRowAction: 'delete',
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  produtos: ProdutoEntity[];
}
