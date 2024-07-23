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
  opcoesPostos: string[] = ['AP', '2T', '1T', 'CP', 'MJ', 'TC', 'CL'];

  ngOnInit(): void { }
}
