import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class LlmService {
  private readonly apiUrl = 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';

  constructor(private readonly http: HttpService) {}

  async analyzeText(prompt: string): Promise<string> {
    const body = {
      contents: [{ parts: [{ text: prompt }] }],
    };

    const response = await firstValueFrom(
      this.http.post(this.apiUrl, body, {
        params: { key: process.env.GEMINI_API_KEY },
      })
    );

    return response.data?.candidates?.[0]?.content?.parts?.[0]?.text || '';
  }
}
