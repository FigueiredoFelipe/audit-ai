import { Controller, Post, Body } from '@nestjs/common';
import { LlmService } from './llm.service';
import { AnalyzeOffensiveDto } from './dto/analyze-offensive.dto';
import { AnalyzeClauseDto } from './dto/analyze-clause.dto';
import { AnalyzeConfessionDto } from './dto/analyze-confession.dto';

@Controller('analysis')
export class AnalysisController {
  constructor(private readonly llmService: LlmService) {}

  @Post('offensive')
  analyzeOffensive(@Body() dto: AnalyzeOffensiveDto) {
    return this.llmService.runPrompt('offensive', dto.text);
  }

  @Post('clause')
  analyzeClause(@Body() dto: AnalyzeClauseDto) {
    return this.llmService.runPrompt('clause', dto.contract);
  }

  @Post('confession')
  analyzeConfession(@Body() dto: AnalyzeConfessionDto) {
    return this.llmService.runPrompt('confession', dto.conversation);
  }
}
