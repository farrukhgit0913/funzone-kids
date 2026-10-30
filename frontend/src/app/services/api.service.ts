import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';
import { Animal } from '../models/animal.model';
import { Score } from '../models/score.model';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  // Animals
  getAnimals(difficulty?: number): Observable<{ success: boolean; data: Animal[] }> {
    const params = difficulty ? `?difficulty=${difficulty}` : '';
    return this.http.get<{ success: boolean; data: Animal[] }>(`${this.apiUrl}/animals${params}`);
  }

  // Scores
  saveScore(score: Score): Observable<{ success: boolean; data: Score; message: string }> {
    return this.http.post<{ success: boolean; data: Score; message: string }>(`${this.apiUrl}/scores`, score);
  }

  getLeaderboard(gameType?: string, limit = 10): Observable<{ success: boolean; data: Score[] }> {
    let params = `?limit=${limit}`;
    if (gameType) params += `&gameType=${gameType}`;
    return this.http.get<{ success: boolean; data: Score[] }>(`${this.apiUrl}/scores/leaderboard${params}`);
  }

  getStats(): Observable<any> {
    return this.http.get(`${this.apiUrl}/scores/stats`);
  }
}
