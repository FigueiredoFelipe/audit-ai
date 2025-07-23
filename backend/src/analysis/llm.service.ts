import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LlmService {
  private readonly apiUrl =
    'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent';

  private readonly apiKey: string;

  constructor(
    private readonly http: HttpService,
    private readonly configService: ConfigService,
  ) {
    this.apiKey = this.configService.get<string>('GEMINI_API_KEY') || '';
  }

  async analyzeText(prompt: string): Promise<string> {
    const body = {
      contents: [{ parts: [{ text: prompt }] }],
    };

    try {
      const response = await firstValueFrom(
        this.http.post(this.apiUrl, body, {
          params: { key: this.apiKey },
        }),
      );

      const result = response?.data as {
        candidates?: { content?: { parts?: { text: string }[] } }[];
      };

      return (
        result.candidates?.[0]?.content?.parts?.[0]?.text ||
        'No response from Gemini.'
      );
    } catch (error) {
      console.error(
        'Gemini API error:',
        error?.response?.data || error.message,
      );
      throw new Error(
        error?.response?.data?.error?.message || 'Failed to call Gemini API',
      );
    }
  }

  private wrapPrompt(
    type: 'offensive' | 'clause' | 'confession',
    content: string,
  ): string {
    const commonInstruction =
      'Respond in English, or in the language requested by the user.';

    const prompts = {
      offensive: `You are a legal assistant trained to detect offensive language. Analyze the following text and indicate whether it contains insults, slurs, or personal attacks. ${commonInstruction}\nText: """${content}"""`,

      clause: `You are a consumer law expert. Read the following contract and identify whether it contains abusive or disadvantageous clauses for the consumer, explaining why. ${commonInstruction}\nContract: """${content}"""`,

      confession: `You are a legal assistant trained to detect confessions or self-incriminating statements in conversations. Analyze the following conversation and determine whether any excerpts constitute an admission of guilt. ${commonInstruction}\nConversation: """${content}"""`,
    };

    return prompts[type];
  }

  async runPrompt(
    type: 'offensive' | 'clause' | 'confession',
    content: string,
  ): Promise<string> {
    const prompt = this.wrapPrompt(type, content);

    const body = {
      contents: [{ parts: [{ text: prompt }] }],
    };

    try {
      const response = await firstValueFrom(
        this.http.post(this.apiUrl, body, {
          params: { key: this.apiKey },
        }),
      );

      return (
        response.data?.candidates?.[0]?.content?.parts?.[0]?.text ||
        'No response from Gemini.'
      );
    } catch (error) {
      console.error('Gemini error:', error?.response?.data || error.message);
      throw new Error(
        error?.response?.data?.error?.message || 'Failed to call Gemini API',
      );
    }
  }
}
