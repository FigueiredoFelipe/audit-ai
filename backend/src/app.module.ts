import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { LlmService } from './analysis/llm.service';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { AnalysisController } from './analysis/analysis.controller';

@Module({
  imports: [ConfigModule.forRoot({ isGlobal: true }), HttpModule],
  controllers: [AppController, AnalysisController],
  providers: [AppService, LlmService],
})
export class AppModule {}
