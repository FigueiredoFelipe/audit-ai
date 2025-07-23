import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AnalysisService } from '../analysis.service';

interface AnalysisHistoryEntry {
  type: string;
  input: string;
  output: string;
  timestamp: Date;
}

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
  history: AnalysisHistoryEntry[] = [];

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
          this.history.unshift({
            type: this.selectedType,
            input: this.text,
            output: this.result,
            timestamp: new Date(),
          });
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

  // highlightResult function to add emojis to the result
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

  // copyToClipboard function to copy the result to the clipboard
  copyToClipboard(text: string): void {
    navigator.clipboard.writeText(text).then(
      () => console.log('Copied to clipboard'),
      (err) => console.error('Failed to copy: ', err)
    );
  }

  getIcon(type: string): string {
    return (
      {
        offensive: '🚫',
        clause: '⚠️',
        confession: '🗣️',
      }[type] || '❓'
    );
  }

  getLabel(type: string): string {
    return (
      {
        offensive: 'Offensive Language',
        clause: 'Abusive Clauses',
        confession: 'Confession in Conversation',
      }[type] || '❓'
    );
  }

  formatDate(date: Date): string {
    return date.toLocaleString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  }
}
