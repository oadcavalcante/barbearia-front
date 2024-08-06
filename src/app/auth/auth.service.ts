import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { Auth } from '../interfaces/auth';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  private readonly apiUrl = environment.apiUrl;

  constructor(private http: HttpClient, private router: Router) { }

  login(login: string, password: string): Observable<Auth> {
    return this.http.post<Auth>(`${this.apiUrl}/auth/login`, { login, password })
      .pipe(
        catchError(this.handleError)
      );
  }

  logout(): void {
    localStorage.removeItem('barbearia-token');
    sessionStorage.removeItem('barbearia-token');
    this.router.navigate(['/login']);
  }

  //Salva o token no localStorage caso o usuário marque o checkbox rememberMe, caso contrário salva no sessionStorage.
  saveToken(token: string, rememberMe: boolean): void {
    const storage = rememberMe ? localStorage : sessionStorage;
    storage.setItem('barbearia-token', token);
  }

  getToken(): string | null {
    return localStorage.getItem('barbearia-token') || sessionStorage.getItem('barbearia-token');
  }

  // Método para verificar se o usuário está autenticado
  isAuthenticated(): boolean {
    return !!this.getToken();
  }

  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Ocorreu um erro inesperado.';

    if (error.error instanceof ErrorEvent) {
      // Erro no lado do cliente
      errorMessage = `Erro: ${error.error.message}`;
    } else {
      // Erro no lado do servidor
      errorMessage = `Código do erro: ${error.status}\nMensagem: ${error.message}`;
    }

    // Propaga o erro para o componente
    return throwError(() => new Error(errorMessage));
  }
}
