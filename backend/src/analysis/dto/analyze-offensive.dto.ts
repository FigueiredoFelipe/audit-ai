import { IsString } from 'class-validator';

export class AnalyzeOffensiveDto {
  @IsString()
  text: string;
}
