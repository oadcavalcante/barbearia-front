import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-graduados',
  templateUrl: './graduados.component.html',
  styleUrls: ['./graduados.component.css']
})
export class GraduadosComponent implements OnInit {
  titleHeader = 'GRADUADOS';
  ramal = '2691';
  tipoMilitar: 'graduados' = 'graduados';
  opcoesGraduacoes: string[] = ['S2','S1','CB','3S', '2S', '1S', 'SO'];

  ngOnInit(): void { }
}
