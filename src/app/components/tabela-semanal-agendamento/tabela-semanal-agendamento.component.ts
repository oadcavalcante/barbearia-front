import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogoAgendamentoComponent } from '../dialogo-agendamento/dialogo-agendamento.component';
import { DialogoCancelamentoAgendamentoComponent } from '../dialogo-cancelamento-agendamento/dialogo-cancelamento-agendamento.component';
import { Agendamento } from 'src/app/interfaces/agendamento';
import { AgendamentoService } from 'src/app/services/agendamento.service';
import { Militar } from 'src/app/interfaces/militar';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { Router } from '@angular/router';

@Component({
  selector: 'app-tabela-semanal-agendamento',
  templateUrl: './tabela-semanal-agendamento.component.html',
  styleUrls: ['./tabela-semanal-agendamento.component.css'],
  animations: [
    trigger('agendamentoAnimacao', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-15px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ opacity: 1, transform: 'translateY(15px)' }))
      ])
    ]),
    trigger('cancelamentoAnimacao', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(15px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ opacity: 1, transform: 'translateY(-15px)' }))
      ])
    ])
  ]
})
export class TabelaSemanalAgendamentoComponent implements OnInit {
  titleHeader: string = '';
  ramal: string = '';
  dataSource: Agendamento[] = [];
  diasDaSemana: string[] = ['segunda', 'terça', 'quarta', 'quinta', 'sexta'];
  horarios: string[] = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '18:00', '18:30'];
  inicioDaSemana!: Date;
  fimDaSemana!: Date;

  constructor(
    private dialog: MatDialog,
    private agendamentoService: AgendamentoService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.getSemanaAtual(); //Pega os dias da semana atual de Segunda a Sexta.
    this.loadAgendamentos();
    this.getOficiaisOrGraduados();
  }

  getOficiaisOrGraduados() {
    if (this.router.url == '/oficiais') {
      this.titleHeader = 'OFICIAIS';
      this.ramal = '2689';
    } else if (this.router.url == '/graduados') {
      this.titleHeader = 'GRADUADOS';
      this.ramal = '2691';
    }
  }

  // Função Responsável por carregar os agendamentos na inicialização.
  loadAgendamentos(): void {
    this.agendamentoService.getAgendamentos()
      .pipe(
        tap(agendamentos => {
          if (agendamentos && agendamentos.length > 0) {
            const agendamentosFiltrados = agendamentos.filter(agendamento => {
              const dataAgendamento = new Date(agendamento.data);
              const diaSemana = dataAgendamento.getDay();
              if (diaSemana === 0) {
                dataAgendamento.setDate(dataAgendamento.getDate() + 1);
              } else if (diaSemana !== 1) {
                dataAgendamento.setDate(dataAgendamento.getDate() - (diaSemana - 1));
              }
              return dataAgendamento >= this.inicioDaSemana && dataAgendamento <= this.fimDaSemana;
            });

            this.dataSource = agendamentosFiltrados.map(agendamento => ({
              ...agendamento,
              diaSemana: agendamento.diaSemana.trim().toLowerCase(),
              hora: agendamento.hora.trim()
            }));
          } else {
            console.warn('Nenhum agendamento disponível para essa semana.');
            this.dataSource = [];
          }
        }),
        catchError(error => {
          console.error('Erro ao obter agendamentos:', error);
          this.dataSource = [];
          return of([]);
        })
      )
      .subscribe();
  }

  // Função Responsável por pegar os dias da semana atual formatados para passar para as colunas da tabela.
  getSemanaAtual(): void {
    const hoje = new Date();
    const diaSemanaAtual = hoje.getDay();
    const inicioDaSemana = new Date(hoje);
    inicioDaSemana.setDate(hoje.getDate() - ((diaSemanaAtual + 6) % 7));
    for (let i = 0; i < 5; i++) {
      const dia = new Date(inicioDaSemana);
      dia.setDate(inicioDaSemana.getDate() + i);
      this.diasDaSemana[i] = this.diasDaSemana[i] + ` - ${dia.getDate().toString().padStart(2, '0')}/${(dia.getMonth() + 1).toString().padStart(2, '0')}`;
    }
    this.inicioDaSemana = inicioDaSemana;
    this.fimDaSemana = new Date(inicioDaSemana);
    this.fimDaSemana.setDate(inicioDaSemana.getDate() + 4);
  }

  // Função para obter o agendamento de um dia e horário específico
  getAgendamentoParaDiaHora(dia: string, hora: string): Agendamento | undefined {
    const diaSemana = dia.split(' - ')[0].trim().toLowerCase();
    const horaFormatada = hora.slice(0, 5);
    const agendamento = this.dataSource.find((agendamento) => {
      const diaMatch = agendamento.diaSemana.toLowerCase() === diaSemana;
      const horaAgendamentoFormatada = agendamento.hora.slice(0, 5);
      const horaMatch = horaAgendamentoFormatada === horaFormatada;
      return diaMatch && horaMatch;
    });
    return agendamento;
  }

  // Função auxiliar para obter a data a partir do dia da semana
  getDataFromDiaSemana(diaSemana: string): string {
    const partes = diaSemana.split(' - ')[1].split('/');
    const dia = partes[0];
    const mes = partes[1];
    const ano = new Date().getFullYear();
    const data = `${ano}-${mes}-${dia}`
    return data;
  }

  // Função responsável por Abrir o Diálogo de Agendamento e Salvar.
  agendarCorte(diaSemana: string, hora: string): void {
    const dialogRef = this.dialog.open(DialogoAgendamentoComponent, {
      width: '300px',
      data: { diaSemana, hora: hora },
    });

    dialogRef.afterClosed().subscribe((militar: Militar) => {
      if (militar) {
        const novoAgendamento: Agendamento = {
          id: 0,
          data: this.getDataFromDiaSemana(diaSemana),
          hora: hora,
          diaSemana: diaSemana.split(' - ')[0],
          militar: {
            id: 0,
            saram: militar.saram,
            gradposto: militar.gradposto,
            nomeGuerra: militar.nomeGuerra.toUpperCase(),
            om: militar.om
          },
          disponivel: false
        };

        this.agendamentoService.saveAgendamento(novoAgendamento).subscribe(response => {
          this.dataSource.push(response);
          this.dataSource = [...this.dataSource];
        }, error => {
          console.error('Erro ao salvar agendamento:', error);
        });
      }
    });
  }

  // Função responsável por Abrir o Diálogo de Cancelamento e Desmarcar.
  desmarcarAgendamento(element: Agendamento): void {
    const dialogRef = this.dialog.open(DialogoCancelamentoAgendamentoComponent, {
      width: '300px',
      data: { diaSemana: element.diaSemana, hora: element.hora },
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (element.id) {
          this.agendamentoService.deleteAgendamento(element.id).subscribe(() => {
            this.dataSource = this.dataSource.filter(a => a.id !== element.id);
          }, error => {
            console.error('Erro ao desmarcar agendamento:', error);
          });
        }
      }
    });
  }
}
