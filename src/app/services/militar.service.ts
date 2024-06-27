import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Militar } from '../interfaces/militar';

@Injectable({
  providedIn: 'root'
})
export class AgendamentoService {
  private apiUrl = 'http://localhost:8080/api/militares';

  constructor(private http: HttpClient) { }

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
}
