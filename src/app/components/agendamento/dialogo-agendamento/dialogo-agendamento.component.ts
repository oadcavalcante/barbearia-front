import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Militar } from 'src/app/interfaces/militar';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-dialogo-agendamento',
  templateUrl: './dialogo-agendamento.component.html',
  styleUrls: ['./dialogo-agendamento.component.css']
})
export class DialogoAgendamentoComponent implements OnInit {
  @Input() opcoesGradPosto?: string[] = [];

  militar: Militar = {
    saram: '',
    gradposto: '',
    nomeGuerra: '',
    om: ''
  };

  oms: string[] = ['CCA-BR', 'CDCAER', 'CIAER', 'COMGEP', 'COPAC', 'DIREF', 'DIRENS', 'EMAER', 'OABR', 'SEFA', 'CENCIAR', 'SECPROM', 'ASPAER', 'CECOMSAER', 'GABAER', 'COJAER'];

  constructor(
    public dialogRef: MatDialogRef<DialogoAgendamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
  ) { }

  ngOnInit(): void {
    this.opcoesGradPosto = this.data.opcoesGradPosto;
  }

  onNoClick(): void {
    this.dialogRef.close();
  }

  onSaveClick(): void {
    this.dialogRef.close(this.militar);
  }

  validateNumericInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    // Remove caracteres que não são dígitos e limita a 9 dígitos
    input.value = input.value.replace(/\D/g, '').slice(0, 9);
    this.militar.saram = input.value; // Atualiza o modelo ngModel manualmente
  }
}
