import { Component, Inject, OnInit, Input } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Militar } from 'src/app/interfaces/militar';
import { Router, NavigationEnd } from '@angular/router';
import { LdapService } from 'src/app/services/ldap.service';
import { UserLdap } from 'src/app/interfaces/userLdap';

@Component({
  selector: 'app-dialogo-agendamento',
  templateUrl: './dialogo-agendamento.component.html',
  styleUrls: ['./dialogo-agendamento.component.css']
})
export class DialogoAgendamentoComponent implements OnInit {
  @Input() opcoesGradPosto?: string[] = [];

  //Dados do Ldap
  ldapData: UserLdap[] = [];
  militar: Militar = {
    saram: '',
    gradposto: '',
    nomeGuerra: '',
    om: '',
    categoria: ''
  };

  oms: string[] = ['CCA-BR', 'CDCAER', 'CIAER', 'COMGEP', 'COPAC', 'DIREF', 'DIRENS', 'EMAER', 'OABR', 'SEFA', 'CENCIAR', 'SECPROM', 'ASPAER', 'CECOMSAER', 'GABAER', 'COJAER'];

  constructor(
    public dialogRef: MatDialogRef<DialogoAgendamentoComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    private ldapService: LdapService
  ) { }

  ngOnInit(): void {
    this.opcoesGradPosto = this.data.opcoesGradPosto;
    this.setLdapData();
  }

  setLdapData() {
    this.ldapService.ldapData$.subscribe(data => {
      this.ldapData = data;
      if (this.ldapData.length > 0) {
        this.militar.nomeGuerra = this.ldapData[0].fabGuerra;
        this.militar.gradposto = this.ldapData[0].fabPostoGrad;
        this.militar.om = this.ldapData[0].fabOM;
        this.militar.saram = this.ldapData[0].fabNrOrdem;
      }
    });
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
