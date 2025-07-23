import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { firstValueFrom } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class LlmService {
  private readonly apiUrl =
    // 'https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent';
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
      'Responda no mesmo idioma em que o conteúdo está escrito.';

    const prompts = {
      offensive: `Você é um assistente jurídico treinado para identificar linguagem ofensiva. Analise o seguinte texto e aponte se há trechos que contenham ofensas, xingamentos ou ataques pessoais. ${commonInstruction}\nTexto: """${content}"""`,

      clause: `Você é um especialista em Direito do Consumidor. Leia o seguinte contrato e aponte se há cláusulas abusivas ou desvantajosas para o consumidor, explicando por quê. ${commonInstruction}\nContrato: """${content}"""`,

      confession: `Você é um assistente jurídico treinado para identificar confissões ou autoincriminações em conversas. Analise a conversa a seguir e diga se há trechos que caracterizam confissão de culpa. ${commonInstruction}\nConversa: """${content}"""`,
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
        'Sem resposta do Gemini.'
      );
    } catch (error) {
      console.error('Erro Gemini:', error?.response?.data || error.message);
      throw new Error(
        error?.response?.data?.error?.message ||
          'Erro ao chamar a API do Gemini',
      );
    }
  }
}
