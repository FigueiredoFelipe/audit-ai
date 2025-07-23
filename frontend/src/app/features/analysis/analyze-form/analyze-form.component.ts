import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AnalysisService } from '../analysis.service';

@Component({
  selector: 'app-analyze-form',
  standalone: true,
  imports: [CommonModule, FormsModule, HttpClientModule],
  templateUrl: './analyze-form.component.html',
  styleUrl: './analyze-form.component.scss',
})
export class AnalyzeFormComponent {
  analysisTypes = [
    { label: 'Offensive Language', value: 'offensive' },
    { label: 'Abusive Clauses', value: 'clause' },
    { label: 'Confession in Conversation', value: 'confession' },
  ];

  selectedType: 'offensive' | 'clause' | 'confession' = 'offensive';
  text = '';
  loading = false;
  result = '';
  error = '';

  constructor(private analysisService: AnalysisService) {}

  async submit(): Promise<void> {
    try {
      this.loading = true;
      this.result = '';
      this.error = '';

      console.log('Starting analysis', {
        type: this.selectedType,
        text: this.text,
      });

      this.analysisService.analyze(this.selectedType, this.text).subscribe({
        next: (res) => {
          console.log('Analysis completed successfully', res);
          this.result = res.result;
          this.loading = false;
        },
        error: (err) => {
          console.error('Error during analysis:', err);
          this.error = err.error?.message || 'Error analyzing the text.';
          this.loading = false;
        },
      });
    } catch (error) {
      console.error('Internal error while processing analysis:', error);
      this.error = 'Internal error while processing the analysis.';
      this.loading = false;
    }
  }

  highlightResult(text: string): string {
    const lines = text.split('\n').map((line) => {
      if (line.toLowerCase().includes('no risk')) {
        return `✅ ${line}`;
      } else if (
        line.toLowerCase().includes('abusive') ||
        line.toLowerCase().includes('critical')
      ) {
        return `⚠️ ${line}`;
      } else if (
        line.toLowerCase().includes('offensive') ||
        line.toLowerCase().includes('insult')
      ) {
        return `❌ ${line}`;
      }
      return line;
    });

    return lines.join('\n');
  }
}
