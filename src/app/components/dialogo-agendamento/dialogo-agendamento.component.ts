import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Militar } from 'src/app/interfaces/militar';
import { Router, NavigationEnd } from '@angular/router';

@Component({
  selector: 'app-dialogo-agendamento',
  templateUrl: './dialogo-agendamento.component.html',
  styleUrls: ['./dialogo-agendamento.component.css']
})
export class DialogoAgendamentoComponent implements OnInit {
  militar: Militar = {
    saram: '',
    gradposto: '',
    nomeGuerra: '',
    om: ''
  };

  opcoesGradPosto?: string[] = [];
  opcoesGraduacao: string[] = ['3S', '2S', '1S', 'SO'];
  opcoesPostos: string[] = ['ASP', '2T', '1T', 'CAP', 'MJ', 'TEN CEL', 'CEL'];
  oms: string[] = ['CCA-BR', 'CDCAER', 'CIAER', 'COMGEP', 'COPAC', 'DIREF', 'DIRENS', 'EMAER', 'OABR', 'SEFA', 'CENCIAR', 'SECPROM', 'ASPAER', 'CECOMSAER', 'GABAER', 'COJAER'];

  constructor(
    public dialogRef: MatDialogRef<DialogoAgendamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.setOpcoesGradPosto();
  }

  // Verifica a rota e atribui os campos das patentes para o array genérico opcoesGradPosto
  setOpcoesGradPosto(): void {
    const currentRoute = this.router.url;
    if (currentRoute === '/graduados') {
      this.opcoesGradPosto = this.opcoesGraduacao.slice();
    } else if (currentRoute === '/oficiais') {
      this.opcoesGradPosto = this.opcoesPostos.slice();
    }
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
