import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  dia: string;
  horario: string;
  gradposto: string;
  saram: string;
  nomeGuerra: string;
  om: string;
}

@Component({
  selector: 'app-dialogo-agendamento',
  templateUrl: './dialogo-agendamento.component.html',
  styleUrls: ['./dialogo-agendamento.component.css']
})
export class DialogoAgendamentoComponent {
  gradposto: string = '';
  opcoesGraduacao: string[] = ['S2', 'S1', 'CB', '3S', '2S', '1S'];
  saram: string = '';
  nomeGuerra: string = '';
  om: string = '';
  oms: string[] = ['CCA-BR', 'CIAER', 'COMGEP', 'COPAC', 'DIREF', 'DIRENS', 'EMAER', 'OABR', 'SEFA', 'CENCIAR', 'SECPROM', 'ASPAER', 'CECOMSAER', 'GABAER', 'COJAER'];

  constructor(
    public dialogRef: MatDialogRef<DialogoAgendamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirm(): void {
    this.dialogRef.close({ gradposto: this.gradposto, saram: this.saram, nomeGuerra: this.nomeGuerra, om: this.om });
  }
}
