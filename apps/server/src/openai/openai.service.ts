import { Injectable, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Configuration, OpenAIApi } from 'openai';

@Injectable()
export class OpenAIService {
  private readonly logger: Logger = new Logger(this.constructor.name);
  private readonly config: Configuration;
  private ai: OpenAIApi;

  constructor(private readonly configService: ConfigService) {
    this.config = new Configuration({
      apiKey: configService.get<string>('OPENAI_API_KEY'),
    });
    this.getAI();
  }

  getAI() {
    try {
      this.ai = new OpenAIApi(this.config);
    } catch (e) {
      this.logger.error('Failed to connect OpenAI.', e);
    }
  }

  async respond(input: string): Promise<string | undefined> {
    try {
      const response = await this.ai.createCompletion({
        model: 'text-davinci-003',
        prompt: input,
        temperature: 0.6,
        max_tokens: 250,
        top_p: 1,
        frequency_penalty: 1,
        presence_penalty: 1,
      });
      this.logger.debug('Response:', response.data.choices[0].text);
      return response.data.choices[0].text;
    } catch (e) {
      this.logger.error('Error fetching response from OpenAI.', e);
    }
  }
}
