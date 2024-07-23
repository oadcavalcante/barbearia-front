import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, catchError } from 'rxjs';
import { Agendamento } from '../interfaces/agendamento';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  private readonly apiUrl = 'http://localhost:8080/api/agendamentos';

  constructor(private http: HttpClient) { }

  // Retorna os cabeçalhos HTTP com o token JWT
  private getHeaders(): HttpHeaders {
    const token = localStorage.getItem('barbearia-token') || sessionStorage.getItem('barbearia-token');
    return new HttpHeaders({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    });
  }

  // Faz uma requisição GET para API buscando todos os agendamentos.
  getAgendamentos(): Observable<Agendamento[]> {
    const headers = this.getHeaders();
    return this.http.get<Agendamento[]>(this.apiUrl, { headers }).pipe(
      catchError((error: any) => {
        console.error('Erro ao obter agendamentos:', error);
        return [];
      })
    );
  }

  // Faz uma requisição POST para API salvando o agendamento.
  saveAgendamento(agendamento: Agendamento): Observable<Agendamento> {
    const headers = this.getHeaders();
    return this.http.post<Agendamento>(this.apiUrl, agendamento, { headers }).pipe(
      catchError(error => {
        console.error('Erro ao salvar agendamento:', error);
        throw error;
      })
    );
  }

  // Faz uma requisição DELETE para API excluindo o agendamento.
  deleteAgendamento(id: number): Observable<void> {
    const headers = this.getHeaders();
    return this.http.delete<void>(`${this.apiUrl}/${id}`, { headers }).pipe(
      catchError(error => {
        console.error('Erro ao excluir agendamento: ', error);
        throw error;
      })
    );
  }
}
