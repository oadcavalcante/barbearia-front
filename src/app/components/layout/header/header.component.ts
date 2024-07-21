import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { trigger, state, style, transition, animate } from '@angular/animations';

export const slideInLogout = trigger('slideInLogout', [
  state('void', style({
    transform: 'translateX(-100%)',
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
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  @Input() titleHeader: string = '';
  @Input() ramal: string = '';

  constructor(
    private authService: AuthService
  ) { }

  logout(){
    this.authService.logout();
  }
}
