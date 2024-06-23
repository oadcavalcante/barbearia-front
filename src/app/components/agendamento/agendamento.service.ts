import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  private apiUrl = 'http://localhost:8080/agendamentos';

  constructor(private http: HttpClient) { }

  getAgendamentos(): Observable<any[]> {
    return this.http.get<any[]>(this.apiUrl);
  }

  saveAgendamento(agendamento: any): Observable<any> {
    return this.http.post<any>(this.apiUrl, agendamento);
  }

  deleteAgendamento(id: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${id}`);
  }
}
