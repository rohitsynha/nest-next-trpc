import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OpenAIService } from '@server/openai/openai.service';

@Module({
  imports: [ConfigModule],
  controllers: [],
  providers: [OpenAIService],
  exports: [OpenAIService],
})
export class OpenAIModule {}
