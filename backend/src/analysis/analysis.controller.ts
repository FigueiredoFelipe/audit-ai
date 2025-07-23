import { Controller, Post, Body } from '@nestjs/common';
import { LlmService } from './llm.service';
import { AnalyzeOffensiveDto } from './dto/analyze-offensive.dto';
import { AnalyzeClauseDto } from './dto/analyze-clause.dto';
import { AnalyzeConfessionDto } from './dto/analyze-confession.dto';

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly llmService: LlmService) {}

  @Post('offensive')
  async analyzeOffensive(@Body() dto: AnalyzeOffensiveDto) {
    const result = await this.llmService.runPrompt('offensive', dto.text);
    return { result };
  }

  @Post('clause')
  async analyzeClause(@Body() dto: AnalyzeClauseDto) {
    const result = await this.llmService.runPrompt('clause', dto.contract);
    return { result };
  }

  @Post('confession')
  async analyzeConfession(@Body() dto: AnalyzeConfessionDto) {
    const result = await this.llmService.runPrompt(
      'confession',
      dto.conversation,
    );
    return { result };
  }
}
