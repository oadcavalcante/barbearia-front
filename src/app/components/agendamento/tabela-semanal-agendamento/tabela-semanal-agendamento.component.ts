import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';

import { Router } from '@angular/router';
import { DialogoAgendamentoComponent } from '../dialogo-agendamento/dialogo-agendamento.component';
import { DialogoCancelamentoAgendamentoComponent } from '../dialogo-cancelamento-agendamento/dialogo-cancelamento-agendamento.component';

export interface Horario {
  hora: string;
  segunda: string;
  terca: string;
  quarta: string;
  quinta: string;
  sexta: string;
  disponivelSegunda: boolean;
  disponivelTerca: boolean;
  disponivelQuarta: boolean;
  disponivelQuinta: boolean;
  disponivelSexta: boolean;
  [key: string]: string | boolean;
}

const ELEMENT_DATA: Horario[] = [
  { hora: '09:00', segunda: '', terca: '', quarta: '', quinta: '', sexta: '', disponivelSegunda: true, disponivelTerca: true, disponivelQuarta: true, disponivelQuinta: true, disponivelSexta: true },
  { hora: '09:30', segunda: '', terca: '', quarta: '', quinta: '', sexta: '', disponivelSegunda: true, disponivelTerca: true, disponivelQuarta: true, disponivelQuinta: true, disponivelSexta: true },
  { hora: '10:00', segunda: '', terca: '', quarta: '', quinta: '', sexta: '', disponivelSegunda: true, disponivelTerca: true, disponivelQuarta: true, disponivelQuinta: true, disponivelSexta: true },
  { hora: '10:30', segunda: '', terca: '', quarta: '', quinta: '', sexta: '', disponivelSegunda: true, disponivelTerca: true, disponivelQuarta: true, disponivelQuinta: true, disponivelSexta: true },
  { hora: '11:00', segunda: '', terca: '', quarta: '', quinta: '', sexta: '', disponivelSegunda: true, disponivelTerca: true, disponivelQuarta: true, disponivelQuinta: true, disponivelSexta: true },
  { hora: '11:30', segunda: '', terca: '', quarta: '', quinta: '', sexta: '', disponivelSegunda: true, disponivelTerca: true, disponivelQuarta: true, disponivelQuinta: true, disponivelSexta: true },
  { hora: '13:30', segunda: '', terca: '', quarta: '', quinta: '', sexta: '', disponivelSegunda: true, disponivelTerca: true, disponivelQuarta: true, disponivelQuinta: true, disponivelSexta: true },
  { hora: '14:00', segunda: '', terca: '', quarta: '', quinta: '', sexta: '', disponivelSegunda: true, disponivelTerca: true, disponivelQuarta: true, disponivelQuinta: true, disponivelSexta: true },
  { hora: '14:30', segunda: '', terca: '', quarta: '', quinta: '', sexta: '', disponivelSegunda: true, disponivelTerca: true, disponivelQuarta: true, disponivelQuinta: true, disponivelSexta: true },
  { hora: '15:00', segunda: '', terca: '', quarta: '', quinta: '', sexta: '', disponivelSegunda: true, disponivelTerca: true, disponivelQuarta: true, disponivelQuinta: true, disponivelSexta: true },
  { hora: '15:30', segunda: '', terca: '', quarta: '', quinta: '', sexta: '', disponivelSegunda: true, disponivelTerca: true, disponivelQuarta: true, disponivelQuinta: true, disponivelSexta: true },
  { hora: '16:00', segunda: '', terca: '', quarta: '', quinta: '', sexta: '', disponivelSegunda: true, disponivelTerca: true, disponivelQuarta: true, disponivelQuinta: true, disponivelSexta: true },
  { hora: '16:30', segunda: '', terca: '', quarta: '', quinta: '', sexta: '', disponivelSegunda: true, disponivelTerca: true, disponivelQuarta: true, disponivelQuinta: true, disponivelSexta: true },
  { hora: '17:00', segunda: '', terca: '', quarta: '', quinta: '', sexta: '', disponivelSegunda: true, disponivelTerca: true, disponivelQuarta: true, disponivelQuinta: true, disponivelSexta: true },
];

@Component({
  selector: 'app-tabela-semanal-agendamento',
  templateUrl: './tabela-semanal-agendamento.component.html',
  styleUrls: ['./tabela-semanal-agendamento.component.css']
})
export class TabelaSemanalAgendamentoComponent implements OnInit {

  displayedColumns: string[] = ['hora', 'segunda', 'terca', 'quarta', 'quinta', 'sexta'];
  dataSource = ELEMENT_DATA;
  diasDaSemana: string[] = [];
  dataInicial: Date | undefined;

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getSemanaAtual();
  }

  openDialog(dia: string, horario: string): void {
    const dialogRef = this.dialog.open(DialogoAgendamentoComponent, {
      width: '300px',
      data: { dia, horario },
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const horarioSelecionado = this.dataSource.find(h => h.hora === horario);
        if (horarioSelecionado) {
          horarioSelecionado[dia] = result.graduacao + ' ' + result.nomeGuerra.toUpperCase();
          switch (dia) {
            case 'segunda':
              horarioSelecionado.disponivelSegunda = false;
              break;
            case 'terca':
              horarioSelecionado.disponivelTerca = false;
              break;
            case 'quarta':
              horarioSelecionado.disponivelQuarta = false;
              break;
            case 'quinta':
              horarioSelecionado.disponivelQuinta = false;
              break;
            case 'sexta':
              horarioSelecionado.disponivelSexta = false;
              break;
            default:
              break;
          }
          this.snackBar.open('Agendamento realizado com sucesso!', 'Fechar', { duration: 3000 });
        }
      }
    });
  }

  desmarcar(element: Horario, dia: string, horario: string): void {
    const dialogRef = this.dialog.open(DialogoCancelamentoAgendamentoComponent, {
      width: '300px',
      data: { dia: dia, horario: horario }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        switch (dia) {
          case 'segunda':
            element.segunda = '';
            element.disponivelSegunda = true;
            break;
          case 'terca':
            element.terca = '';
            element.disponivelTerca = true;
            break;
          case 'quarta':
            element.quarta = '';
            element.disponivelQuarta = true;
            break;
          case 'quinta':
            element.quinta = '';
            element.disponivelQuinta = true;
            break;
          case 'sexta':
            element.sexta = '';
            element.disponivelSexta = true;
            break;
          default:
            break;
        }
        this.snackBar.open('Agendamento desmarcado com sucesso!', 'Fechar', { duration: 3000 });
      }
    });
  }

  getSemanaAtual(): void {
    const hoje = new Date();

    const diaSemanaAtual = hoje.getDay();
    const inicioDaSemana = new Date(hoje);
    inicioDaSemana.setDate(hoje.getDate() - ((diaSemanaAtual + 6) % 7));

    this.diasDaSemana = [];
    for (let i = 0; i < 5; i++) {
      const dia = new Date(inicioDaSemana);
      dia.setDate(inicioDaSemana.getDate() + i);

      const diaFormatado = ('0' + dia.getDate()).slice(-2) + '/' + ('0' + (dia.getMonth() + 1)).slice(-2);
      this.diasDaSemana.push(diaFormatado);
    }
  }


}

