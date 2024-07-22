import { Component, Input, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogoAgendamentoComponent } from '../dialogo-agendamento/dialogo-agendamento.component';
import { DialogoCancelamentoComponent } from '../dialogo-cancelamento/dialogo-cancelamento.component';
import { Agendamento } from 'src/app/interfaces/agendamento';
import { AgendamentoService } from 'src/app/services/agendamento.service';
import { Militar } from 'src/app/interfaces/militar';
import { catchError, tap } from 'rxjs/operators';
import { of } from 'rxjs';
import { trigger, transition, style, animate } from '@angular/animations';
import { MilitarService } from 'src/app/services/militar.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-tabela-semanal',
  templateUrl: './tabela-semanal.component.html',
  styleUrls: ['./tabela-semanal.component.css'],
  animations: [
    trigger('agendamentoAnimacao', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(-25px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ opacity: 1, transform: 'translateY(15px)' }))
      ])
    ]),
    trigger('cancelamentoAnimacao', [
      transition(':enter', [
        style({ opacity: 0, transform: 'translateY(25px)' }),
        animate('500ms ease-out', style({ opacity: 1, transform: 'translateY(0)' }))
      ]),
      transition(':leave', [
        animate('500ms ease-in', style({ opacity: 1, transform: 'translateY(-15px)' }))
      ])
    ])
  ]
})
export class TabelaSemanalComponent implements OnInit {
  @Input() categoria: string = '';
  @Input() opcoesGradPosto: string[] = [];

  oficiais: Militar[] = [];
  graduados: Militar[] = [];

  agendamentos: Agendamento[] = [];
  diasDaSemana: string[] = ['segunda', 'terça', 'quarta', 'quinta', 'sexta'];
  horarios: string[] = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00', '18:00', '18:30'];
  inicioDaSemana!: Date;
  fimDaSemana!: Date;

  constructor(
    private dialog: MatDialog,
    private agendamentoService: AgendamentoService,
    private militarService: MilitarService,
    private route: ActivatedRoute
  ) { }

  ngOnInit(): void {
    this.getSemanaAtual(); //Pega os dias da semana atual de Segunda a Sexta.
    this.loadGradOficialData();
  }

  //Carrega os dados de acordo com a rota /oficiais ou graduados
  loadGradOficialData() {
    const currentRoute = this.route.snapshot.url[0]?.path;
    if (currentRoute === 'oficiais') {
      this.categoria = 'oficial';
    } else if (currentRoute === 'graduados') {
      this.categoria = 'graduado';
    }
    this.loadMilitares(this.categoria);
    this.loadAgendamentos(this.categoria);
  }

  loadMilitares(categoria: string) {
    this.militarService.getMilitaresByCategoria(categoria).subscribe(data => {
      if (categoria === 'oficial') {
        this.oficiais = data;
      } else if (categoria === 'graduado') {
        this.graduados = data;
      }
    });
  }

  // Função Responsável por carregar os agendamentos de acordo com a categoria (oficial ou graduado)
  loadAgendamentos(categoria: string): void {
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
              return dataAgendamento >= this.inicioDaSemana && dataAgendamento <= this.fimDaSemana && agendamento.militar.categoria === categoria;
            });

            this.agendamentos = agendamentosFiltrados.map(agendamento => ({
              ...agendamento,
              diaSemana: agendamento.diaSemana.trim().toLowerCase(),
              hora: agendamento.hora.trim()
            }));
          } else {
            console.warn('Nenhum agendamento disponível para essa semana.');
            this.agendamentos = [];
          }
        }),
        catchError(error => {
          console.error('Erro ao obter agendamentos:', error);
          this.agendamentos = [];
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
    const agendamento = this.agendamentos.find((agendamento) => {
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

  // Função responsável por Abrir o Diálogo de Agendamento.
  agendarCorte(diaSemana: string, hora: string): void {
    const dialogRef = this.dialog.open(DialogoAgendamentoComponent, {
      width: '300px',
      data: { diaSemana, hora: hora, opcoesGradPosto: this.opcoesGradPosto },
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
            om: militar.om,
            categoria: this.categoria
          },
          categoria: this.categoria,
          disponivel: false
        };

        this.agendamentoService.saveAgendamento(novoAgendamento).subscribe(response => {
          this.agendamentos.push(response);
          this.agendamentos = [...this.agendamentos];
        }, error => {
          console.error('Erro ao salvar agendamento:', error);
        });
      }
    });
  }

  // Função responsável por Abrir o Diálogo de Cancelamento e Desmarcar.
  desmarcarAgendamento(element: Agendamento): void {
    const dialogRef = this.dialog.open(DialogoCancelamentoComponent, {
      width: '300px',
      data: { diaSemana: element.diaSemana, hora: element.hora },
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        if (element.id) {
          this.agendamentoService.deleteAgendamento(element.id).subscribe(() => {
            this.agendamentos = this.agendamentos.filter(a => a.id !== element.id);
          }, error => {
            console.error('Erro ao desmarcar agendamento:', error);
          });
        }
      }
    });
  }
}
