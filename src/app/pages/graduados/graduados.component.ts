import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrientacoesComponent } from 'src/app/components/agendamento/orientacoes/orientacoes.component';

@Component({
  selector: 'app-graduados',
  templateUrl: './graduados.component.html',
  styleUrls: ['./graduados.component.css'],
})
export class GraduadosComponent implements OnInit {
  titleHeader = 'GRADUADOS';
  ramal = '2691';
  categoria = 'graduado';
  opcoesGraduacoes: string[] = ['S2', 'S1', 'CB', '3S', '2S', '1S', 'SO'];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dialog.open(OrientacoesComponent, {
      enterAnimationDuration: '1000ms'
    });
  }
}
