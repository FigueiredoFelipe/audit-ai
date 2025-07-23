import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

type AnalysisType = 'offensive' | 'clause' | 'confession';

@Injectable({
  providedIn: 'root',
})
export class AnalysisService {
  private readonly API_URL = 'http://localhost:3000/analysis';

  constructor(private http: HttpClient) {}

  analyze(type: AnalysisType, text: string): Observable<{ result: string }> {
    const body =
      type === 'offensive'
        ? { text }
        : type === 'clause'
        ? { contract: text }
        : { conversation: text };

    return this.http.post<{ result: string }>(`${this.API_URL}/${type}`, body);
  }
}
