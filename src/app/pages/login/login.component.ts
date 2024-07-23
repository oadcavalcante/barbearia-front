import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { slideInLogout } from 'src/app/components/layout/header/header.component';
import { UserLdap } from 'src/app/interfaces/userLdap';
import { LdapService } from 'src/app/services/ldap.service';

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

  constructor(
    private authService: AuthService,
    private ldapService: LdapService,
    private router: Router
  ) { }

  onSubmit(): void {
    this.authService.login(this.login, this.password).subscribe({
      next: response => {
        this.authService.saveToken(response.token, this.rememberMe);
        this.fetchLdapData();
      },
      error: err => {
        this.errorMessage = 'Credenciais inválidas';
        console.error('Erro ao tentar fazer login:', err);
      }
    });
  }

  private fetchLdapData(): void {
    this.ldapService.getLdapData(this.login, this.password).subscribe({
      next: data => {
        this.ldapService.setLdapData(data);
        this.redirectUser(data);
      },
      error: err => {
        this.errorMessage = 'Erro ao obter dados LDAP';
        console.error('Erro ao obter dados LDAP:', err);
      }
    });
  }

  private redirectUser(ldapData: UserLdap[]): void {
    const postoGrad = ldapData[0].fabPostoGrad;
    const route = this.determineRoute(postoGrad);
    this.router.navigate([route]);
  }

  private determineRoute(postoGrad: string): string {
    const postos = ['AP', '2T', '1T', 'CP', 'MJ', 'TC', 'CL'];
    if (postos.includes(postoGrad)) {
      return '/oficiais';
    } else {
      return '/graduados';
    }
  }
}
