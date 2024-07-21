import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-dialogo-logout',
  templateUrl: './dialogo-logout.component.html',
  styleUrls: ['./dialogo-logout.component.css']
})
export class DialogoLogoutComponent {

  constructor(private authService: AuthService,
    public dialogRef: MatDialogRef<DialogoLogoutComponent>,
  ) { }

  cancel() {
    this.dialogRef.close();
  }

  logout() {
    this.dialogRef.close();
    this.authService.logout();
  }
}
