import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  login: string = '';
  password: string = '';
  errorMessage: string = '';
  rememberMe: boolean = false;

  constructor(private authService: AuthService, private router: Router) { }

  onSubmit(): void {
    this.authService.login(this.login, this.password).subscribe({
      next: response => {
        this.authService.saveToken(response.token, this.rememberMe);
        this.router.navigate(['/graduados']);
      },
      error: err => {
        this.errorMessage = 'Credenciais inválidas';
        console.error('Erro ao tentar fazer login:', err);
      }
    });
  }
}
