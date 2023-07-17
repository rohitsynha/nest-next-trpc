import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { TrpcModule } from '@server/trpc/trpc.module';

import configuration from '@server/configuration';

@Module({
  imports: [
    TrpcModule,
    ConfigModule.forRoot({
      envFilePath: ['ABS.conf', '.env'],
      load: [configuration],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
