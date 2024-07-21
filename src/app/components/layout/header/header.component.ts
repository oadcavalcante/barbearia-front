import { Component, Input } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

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
