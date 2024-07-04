import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

export interface DialogData {
  diaSemana: string;
  hora: string;
  saram: string;
}

@Component({
  selector: 'app-dialogo-cancelamento-agendamento',
  templateUrl: './dialogo-cancelamento-agendamento.component.html',
})
export class DialogoCancelamentoAgendamentoComponent {
  saram: string = '';
  constructor(
    public dialogRef: MatDialogRef<DialogoCancelamentoAgendamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {
  }

  onNoClick(): void {
    this.dialogRef.close(false);
  }

  onYesClick(): void {
    // if(this.saram != '7442068') {
    //   alert('Só é possível desmarcar com um SARAM Administrador! Contate o GAP-BR');
    //   return;
    // }
    this.dialogRef.close({ dia: this.data.diaSemana, hora: this.data.hora, saram: this.data.saram });
  }
}
