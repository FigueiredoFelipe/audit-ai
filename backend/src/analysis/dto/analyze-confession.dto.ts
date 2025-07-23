import { IsString } from 'class-validator';

export class AnalyzeConfessionDto {
  @IsString()
  conversation: string;
}
