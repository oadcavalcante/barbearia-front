import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { DialogoAgendamentoComponent } from '../dialogo-agendamento/dialogo-agendamento.component';
import { DialogoCancelamentoAgendamentoComponent } from '../dialogo-cancelamento-agendamento/dialogo-cancelamento-agendamento.component';
import { AgendamentoService } from '../agendamento.service';

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
  diasDaSemana: string[] = ['segunda', 'terca', 'quarta', 'quinta', 'sexta'];

  constructor(
    private dialog: MatDialog,
    private snackBar: MatSnackBar,
    private router: Router,
    private agendamentoService: AgendamentoService
  ) { }

  ngOnInit(): void {
    this.getSemanaAtual();
    this.loadAgendamentos();
  }

  openDialog(dia: string, horario: string): void {
    const dialogRef = this.dialog.open(DialogoAgendamentoComponent, {
      width: '300px',
      data: { dia, horario },
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        const agendamento = {
          data: new Date().toISOString().split('T')[0],
          hora: horario,
          diaSemana: dia,
          militar: {
            saram: result.saram,
            gradposto: result.gradposto,
            nomeGuerra: result.nomeGuerra,
            om: result.om,
          }
        };
        this.agendamentoService.saveAgendamento(agendamento).subscribe(() => {
          const novoAgendamento: Horario = {
            hora: horario,
            segunda: agendamento.diaSemana === 'segunda' ? `${agendamento.militar.gradposto} ${agendamento.militar.nomeGuerra.toUpperCase()}` : '',
            terca: agendamento.diaSemana === 'terca' ? `${agendamento.militar.gradposto} ${agendamento.militar.nomeGuerra.toUpperCase()}` : '',
            quarta: agendamento.diaSemana === 'quarta' ? `${agendamento.militar.gradposto} ${agendamento.militar.nomeGuerra.toUpperCase()}` : '',
            quinta: agendamento.diaSemana === 'quinta' ? `${agendamento.militar.gradposto} ${agendamento.militar.nomeGuerra.toUpperCase()}` : '',
            sexta: agendamento.diaSemana === 'sexta' ? `${agendamento.militar.gradposto} ${agendamento.militar.nomeGuerra.toUpperCase()}` : '',
            disponivelSegunda: true,
            disponivelTerca: true,
            disponivelQuarta: true,
            disponivelQuinta: true,
            disponivelSexta: true
          };

          this.dataSource = this.dataSource.map(item => item.hora === horario ? novoAgendamento : item);
          this.snackBar.open('Agendamento realizado com sucesso!', 'Fechar', { duration: 3000 });
        });
      }
    });
  }

  desmarcar(element: Horario, dia: string, horario: string): void {
    const dialogRef = this.dialog.open(DialogoCancelamentoAgendamentoComponent, {
      width: '300px',
      data: { dia: dia, horario: horario },
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.agendamentoService.deleteAgendamento(result.id).subscribe(() => {
          this.loadAgendamentos();
          this.snackBar.open('Agendamento desmarcado com sucesso!', 'Fechar', { duration: 3000 });
        });
      }
    });
  }

  getSemanaAtual(): void {
    const hoje = new Date();
    const diaSemanaAtual = hoje.getDay();
    const inicioDaSemana = new Date(hoje);
    inicioDaSemana.setDate(hoje.getDate() - ((diaSemanaAtual + 6) % 7));

    for (let i = 0; i < 5; i++) {
      const dia = new Date(inicioDaSemana);
      dia.setDate(inicioDaSemana.getDate() + i);
      this.diasDaSemana[i] =`${dia.getDate().toString().padStart(2, '0')}/${(dia.getMonth() + 1).toString().padStart(2, '0')}`;
    }
  }

  loadAgendamentos(): void {
    this.agendamentoService.getAgendamentos().subscribe(agendamentos => {
      console.log('Agendamentos recebidos:', agendamentos);

      this.dataSource.forEach(horario => {
        this.diasDaSemana.forEach(dia => {
          const diaDaSemana = dia.split(' ')[0].toLowerCase();
          const agendamento = agendamentos.find(a => a.hora === horario.hora && a.diaSemana === diaDaSemana);

          if (agendamento) {
            horario[diaDaSemana] = `${agendamento.militar.gradposto} ${agendamento.militar.nomeGuerra.toUpperCase()}`;
            horario[`disponivel${diaDaSemana.charAt(0).toUpperCase() + diaDaSemana.slice(1)}`] = false;
          } else {
            horario[diaDaSemana] = '';
            horario[`disponivel${diaDaSemana.charAt(0).toUpperCase() + diaDaSemana.slice(1)}`] = true;
          }
        });
      });
    });
  }

}
