import { IsString } from 'class-validator';

export class AnalyzeClauseDto {
  @IsString()
  contract: string;
}
