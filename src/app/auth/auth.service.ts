import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) { }

  login(login: string, password: string): Observable<any> {
    return this.http.post<any>(`${this.apiUrl}/auth/login`, { login, password });
  }

  //Salva o token no localStorage caso o usuário marque o checkbox rememberMe
  saveToken(token: string, rememberMe: boolean): void {
    if (rememberMe) {
      localStorage.setItem('barbearia-token', token);
    } else {
      sessionStorage.setItem('barbearia-token', token);
    }
  }

  getToken(): string | null {
    return localStorage.getItem('barbearia-token') || sessionStorage.getItem('barbearia-token');
  }

  // Exemplo de método para logout, se necessário
  logout(): void {
    localStorage.removeItem('barbearia-token');
    sessionStorage.removeItem('barbearia-token');
    // Adicione lógica adicional, como redirecionamento para a página de login
  }

  // Método para verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    return !!(localStorage.getItem('barbearia-token') || sessionStorage.getItem('barbearia-token'));
  }
}
