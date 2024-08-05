import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Militar } from 'src/app/interfaces/militar';
import { UserLdap } from 'src/app/interfaces/userLdap';
import { LdapService } from 'src/app/services/ldap.service';

export interface DialogData {
  diaSemana: string;
  hora: string;
  saram: string;
}

@Component({
  selector: 'app-dialogo-cancelamento',
  templateUrl: './dialogo-cancelamento.component.html',
})
export class DialogoCancelamentoComponent {
  saram: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogoCancelamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    this.dialogRef.close({ dia: this.data.diaSemana, hora: this.data.hora, saram: this.data.saram });
  }
}
