import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Militar } from 'src/app/interfaces/militar';

@Component({
  selector: 'app-dialogo-agendamento',
  templateUrl: './dialogo-agendamento.component.html',
  styleUrls: ['./dialogo-agendamento.component.css']
})
export class DialogoAgendamentoComponent {
  militar: Militar = {
    saram: '',
    gradposto: '',
    nomeGuerra: '',
    om: ''
  };

  opcoesGraduacao: string[] = ['S2', 'S1', 'CB', '3S', '2S', '1S'];
  oms: string[] = ['CCA-BR', 'CDCAER', 'CIAER', 'COMGEP', 'COPAC', 'DIREF', 'DIRENS', 'EMAER', 'OABR', 'SEFA', 'CENCIAR', 'SECPROM', 'ASPAER', 'CECOMSAER', 'GABAER', 'COJAER'];

  constructor(
    public dialogRef: MatDialogRef<DialogoAgendamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close(this.militar);
  }
}
