import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { slideInLogout } from 'src/app/components/layout/header/header.component';

export const slideInLogin = trigger('slideInLogin', [
  state('void', style({
    transform: 'translateX(100%)',
    opacity: 0
  })),
  state('*', style({
    transform: 'translateX(0%)',
    opacity: 1
  })),
  transition('void => *', [
    animate('500ms ease-in-out')
  ])
]);

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  animations: [slideInLogout]
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
