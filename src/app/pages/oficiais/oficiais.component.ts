import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { OrientacoesComponent } from 'src/app/components/agendamento/orientacoes/orientacoes.component';

@Component({
  selector: 'app-oficiais',
  templateUrl: './oficiais.component.html',
  styleUrls: ['./oficiais.component.css'],
})
export class OficiaisComponent implements OnInit {
  titleHeader = 'OFICIAIS';
  ramal = '2689';
  categoria = 'oficial';
  opcoesPostos: string[] = ['AP', '2T', '1T', 'CP', 'MJ', 'TC', 'CL'];

  constructor(private dialog: MatDialog) { }

  ngOnInit(): void {
    this.dialog.open(OrientacoesComponent, {
      enterAnimationDuration: '1000ms'
    });
  }
}
