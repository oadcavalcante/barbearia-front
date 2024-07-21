import { Component, OnInit } from '@angular/core';
import { slideInLogin } from '../login/login.component';

@Component({
  selector: 'app-graduados',
  templateUrl: './graduados.component.html',
  styleUrls: ['./graduados.component.css'],
  animations: [slideInLogin]
})
export class GraduadosComponent implements OnInit {
  titleHeader = 'GRADUADOS';
  ramal = '2691';
  tipoMilitar: 'graduados' = 'graduados';
  opcoesGraduacoes: string[] = ['S2','S1','CB','3S', '2S', '1S', 'SO'];

  ngOnInit(): void { }
}
