import { INestApplication, Injectable, Logger } from '@nestjs/common';
import { TrpcService } from '@server/trpc/trpc.service';
import { z } from 'zod';
import * as trpcExpress from '@trpc/server/adapters/express';
import { OpenAIService } from '@server/openai/openai.service';

@Injectable()
export class TrpcRouter {
  private readonly logger: Logger = new Logger(this.constructor.name);
  constructor(private readonly trpc: TrpcService, private ai: OpenAIService) {}

  appRouter = this.trpc.router({
    aiChat: this.trpc.procedure
      .input(
        z.object({
          queryText: z.string(),
        }),
      )
      .query(({ input }) => {
        const { queryText } = input;
        this.logger.debug('Processing Query: ', queryText);
        return this.ai.respond(queryText);
      }),
  });

  async applyMiddleware(app: INestApplication) {
    app.use(
      '/trpc',
      trpcExpress.createExpressMiddleware({
        router: this.appRouter,
      }),
    );
  }
}

export type AppRouter = TrpcRouter['appRouter'];
