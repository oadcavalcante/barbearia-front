import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogoAgendamentoComponent } from '../dialogo-agendamento/dialogo-agendamento.component';
import { DialogoCancelamentoAgendamentoComponent } from '../dialogo-cancelamento-agendamento/dialogo-cancelamento-agendamento.component';
import { Agendamento } from 'src/app/interfaces/agendamento';
import { AgendamentoService } from 'src/app/services/agendamento.service';
import { Militar } from 'src/app/interfaces/militar';

@Component({
  selector: 'app-tabela-semanal-agendamento',
  templateUrl: './tabela-semanal-agendamento.component.html',
  styleUrls: ['./tabela-semanal-agendamento.component.css']
})
export class TabelaSemanalAgendamentoComponent implements OnInit {
  dataSource: Agendamento[] = [];
  diasDaSemana: string[] = ['segunda', 'terca', 'quarta', 'quinta', 'sexta'];
  horarios: string[] = ['09:00', '09:30', '10:00', '10:30', '11:00', '11:30', '13:30', '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'];

  constructor(
    private dialog: MatDialog,
    private agendamentoService: AgendamentoService
  ) { }

  ngOnInit(): void {
    this.getSemanaAtual();
    this.loadAgendamentos();
  }

  // Função Responsável por carregar os agendamentos na inicialização.
  loadAgendamentos(): void {
    this.agendamentoService.getAgendamentos().subscribe(agendamentos => {
      console.log('Agendamentos recebidos do service:', agendamentos);
      this.dataSource = agendamentos;
    });
  }

  // Função responsável por Abrir o Diálogo de Agendamento e Salvar.
  agendarCorte(diaSemana: string, horario: string): void {
    const dialogRef = this.dialog.open(DialogoAgendamentoComponent, {
      width: '300px',
      data: { diaSemana, hora: horario },
      autoFocus: true
    });

    dialogRef.afterClosed().subscribe((militar: Militar) => {
      if (militar) {
        const novoAgendamento: Agendamento = {
          id: 0,
          data: this.getDataFromDiaSemana(diaSemana),
          hora: horario,
          diaSemana: diaSemana.split(' - ')[0],
          militar: {
            id: 0,
            saram: militar.saram,
            gradposto: militar.gradposto,
            nomeGuerra: militar.nomeGuerra,
            om: militar.om
          },
          disponivel: false
        };

        this.agendamentoService.saveAgendamento(novoAgendamento).subscribe(response => {
          this.dataSource.push(response);
          this.dataSource = [...this.dataSource];
          this.loadAgendamentos();
        }, error => {
          console.error('Erro ao salvar agendamento:', error);
        });
      }
    });
  }

  // Função auxiliar para obter a data a partir do dia da semana
  getDataFromDiaSemana(diaSemana: string): string {
    const partes = diaSemana.split(' - ')[1].split('/');
    const dia = partes[0];
    const mes = partes[1];
    const ano = new Date().getFullYear();
    return `${ano}-${mes}-${dia}`;
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
        console.log('Implemente a Lógica para desmarcar o agendamento');
      }
    });
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
  }

  // Função para obter o agendamento de um dia específico e horário específico
  getAgendamentoParaDiaHora(dia: string, horario: string): Agendamento | undefined {
    const diaSemana = dia.split(' - ')[0];
    return this.dataSource.find(agendamento => agendamento.diaSemana === diaSemana && agendamento.hora === horario);
  }
}
