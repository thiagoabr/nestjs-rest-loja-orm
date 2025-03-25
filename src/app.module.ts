import {
  ClassSerializerInterceptor,
  ConsoleLogger,
  Module,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProdutoModule } from './modulos/produto/produto.module';
import { UsuarioModule } from './modulos/usuario/usuario.module';
import { FornecedorModule } from './modulos/fornecedor/fornecedor.module';
import { PostgresConfigService } from './config/postgres.config.service';
import { PedidoModule } from './modulos/pedido/pedido.module';
import { RoleModule } from './modulos/role/role.module';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { FiltroDeExcecaoGlobal } from '../src/recursos/filtros/filtro-de-excecao-global';
import { CacheModule } from '@nestjs/cache-manager';
import { redisStore } from 'cache-manager-redis-yet';
import { AutenticacaoModule } from './modulos/autenticacao/autenticacao.module';
import { LoggerGlobalInterceptor } from './recursos/interceptores/logger-global.interceptor';

@Module({
  imports: [
    UsuarioModule,
    ProdutoModule,
    FornecedorModule,
    PedidoModule,
    RoleModule,
    AutenticacaoModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      useClass: PostgresConfigService,
      inject: [PostgresConfigService],
    }),
    CacheModule.registerAsync({
      useFactory: async () => ({
        store: await redisStore({ ttl: 10 * 1000 }),
      }),
      isGlobal: true,
    }),
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: FiltroDeExcecaoGlobal,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerGlobalInterceptor,
    },
    ConsoleLogger,
  ],
})
export class AppModule {}
