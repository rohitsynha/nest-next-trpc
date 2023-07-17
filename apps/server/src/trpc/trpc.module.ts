import { Module } from '@nestjs/common';
import { TrpcService } from '@server/trpc/trpc.service';
import { TrpcRouter } from '@server/trpc/trpc.router';
import { OpenAIModule } from '@server/openai/openai.module';

@Module({
  imports: [OpenAIModule],
  controllers: [],
  providers: [TrpcService, TrpcRouter],
})
export class TrpcModule {}
