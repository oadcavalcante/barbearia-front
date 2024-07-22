import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Militar } from '../interfaces/militar';

@Injectable({
  providedIn: 'root'
})
export class MilitarService {
  private apiUrl = 'http://localhost:8080/api/militares';

  constructor(private http: HttpClient) { }

  // Retorna os cabeçalhos HTTP com o token JWT
  public getHeaders(): HttpHeaders {
    const token = localStorage.getItem('barbearia-token') || sessionStorage.getItem('barbearia-token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Faz uma requisição GET para API buscando todos os militares.
  getMilitares(): Observable<Militar[]> {
    return this.http.get<Militar[]>(this.apiUrl);
  }

  // Faz uma requisição POST para API salvando o militares.
  saveMilitar(agendamento: Militar): Observable<Militar> {
    return this.http.post<Militar>(this.apiUrl, agendamento);
  }

  // Faz uma requisição DELETE para API excluindo o militar.
  deleteMilitar(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }

  getMilitaresByCategoria(categoria: string): Observable<Militar[]> {
    const headers = this.getHeaders();
    return this.http.get<Militar[]>(`${this.apiUrl}/categoria/${categoria}`, { headers }).pipe(
      catchError(error => {
        console.error('Erro ao buscar militares: ', error);
        throw error;
      })
    );
  }
}
