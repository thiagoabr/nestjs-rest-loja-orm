import { PartialType } from '@nestjs/mapped-types';
import { CriaRoleDto } from './CriaRole.dto';

export class AtualizaRoleDto extends PartialType(CriaRoleDto) {}
