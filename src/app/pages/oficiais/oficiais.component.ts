import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-oficiais',
  templateUrl: './oficiais.component.html',
  styleUrls: ['./oficiais.component.css']
})
export class OficiaisComponent implements OnInit {
  titleHeader = 'OFICIAIS';
  ramal = '2689';
  tipoMilitar: 'oficiais' = 'oficiais';
  opcoesPostos: string[] = ['ASP', '2T', '1T', 'CAP', 'MJ', 'TEN CEL', 'CEL'];

  ngOnInit(): void { }
}
