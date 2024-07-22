import { Component, OnInit } from '@angular/core';
import { slideInLogin } from '../login/login.component';

@Component({
  selector: 'app-oficiais',
  templateUrl: './oficiais.component.html',
  styleUrls: ['./oficiais.component.css'],
  animations: [slideInLogin]
})
export class OficiaisComponent implements OnInit {
  titleHeader = 'OFICIAIS';
  ramal = '2689';
  categoria = 'oficial';
  opcoesPostos: string[] = ['ASP', '2T', '1T', 'CAP', 'MJ', 'TEN CEL', 'CEL'];

  ngOnInit(): void { }
}
