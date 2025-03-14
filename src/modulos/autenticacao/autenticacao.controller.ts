import { Controller, Post, Body, BadRequestException } from '@nestjs/common';
import { AutenticacaoService } from './autenticacao.service';
import { AutenticaDto } from './dto/autentica.dto';

@Controller('autenticacao')
export class AutenticacaoController {
  constructor(private readonly autenticacaoService: AutenticacaoService) {}

  @Post('login')
  login(@Body() { email, senha }: AutenticaDto) {
    try {
      return this.autenticacaoService.login(email, senha);
    } catch (error) {
      throw new BadRequestException('Erro ao tentar efetuar o Login');
    }
  }
}
