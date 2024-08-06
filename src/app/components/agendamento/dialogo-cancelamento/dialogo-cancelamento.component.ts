import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
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
    private snackBar: MatSnackBar,
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    const autorizado = this.verifySaram();
    if (autorizado) {
      this.snackBar.open('Agendamento desmarcado com sucesso.', 'X', {
        duration: 3000, // Duração em milissegundos
      });
      this.dialogRef.close({ dia: this.data.diaSemana, hora: this.data.hora, saram: this.data.saram });
    } else {
      this.snackBar.open('Somente o militar associado ao agendamento pode desmarcar.', 'X', {
        duration: 3000,
      });
      this.dialogRef.close(false);
    }
  }

  verifySaram(): boolean {
    const ldapDataString = sessionStorage.getItem('ldap-data');
    if (ldapDataString) {
      const ldapData = JSON.parse(ldapDataString);
      const fabNrOrdem = ldapData[0].fabNrOrdem;
      // Compara o SARAM do sessionStorage com o SARAM do agendamento clicado.
      if (fabNrOrdem === this.data.saram) {
        return true;
      } else {
        return false;
      }
    } else {
      console.error('Nenhum dado encontrado no sessionStorage.');
      return false;
    }
  }
}
