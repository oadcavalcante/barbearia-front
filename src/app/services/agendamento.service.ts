import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Agendamento } from '../interfaces/agendamento';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  private apiUrl = 'http://localhost:8080/api/agendamentos';

  constructor(private http: HttpClient) { }

  // Faz uma requisição GET para API buscando todos os agendamentos.
  getAgendamentos(): Observable<Agendamento[]> {
    return this.http.get<Agendamento[]>(this.apiUrl);
  }

  // Faz uma requisição POST para API salvando o agendamento.
  saveAgendamento(agendamento: Agendamento): Observable<Agendamento> {
    return this.http.post<Agendamento>(this.apiUrl, agendamento);
  }

  // Faz uma requisição DELETE para API excluindo o agendamento.
  deleteAgendamento(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}
