import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { LlmService } from './analysis/llm.service';
import { Query } from '@nestjs/common';

@Controller()
export class AppController {
  constructor(private readonly llmService: LlmService) {}

  @Get('analyze')
  async analyzeText(@Query('text') text: string): Promise<{ result: string }> {
    const prompt = text || 'Hello Gemini';
    const result = await this.llmService.analyzeText(prompt);
    return { result };
  }
}
