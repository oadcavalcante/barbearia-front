import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  dia: string;
  horario: string;
  saram: string;
  nomeGuerra: string;
}

@Component({
  selector: 'app-dialogo-agendamento',
  templateUrl: './dialogo-agendamento.component.html',
  styleUrls: ['./dialogo-agendamento.component.css']
})
export class DialogoAgendamentoComponent {
  graduacao: string = '';
  opcoesGraduacao: string[] = ['S2', 'S1', 'CB', '3S', '2S', '1S'];
  saram: string = '';
  nomeGuerra: string = '';

  constructor(
    public dialogRef: MatDialogRef<DialogoAgendamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    this.dialogRef.close({ graduacao: this.graduacao, saram: this.saram, nomeGuerra: this.nomeGuerra });
  }
}
