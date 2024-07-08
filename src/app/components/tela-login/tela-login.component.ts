import { Component } from '@angular/core';

@Component({
  selector: 'app-tela-login',
  templateUrl: './tela-login.component.html',
  styleUrls: ['./tela-login.component.css']
})
export class TelaLoginComponent {

  login() {
    console.log('Clicou no botão de login.'); 
  }
}
