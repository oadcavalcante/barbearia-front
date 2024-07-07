import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabelaSemanalAgendamentoComponent } from './components/agendamento/tabela-semanal-agendamento/tabela-semanal-agendamento.component';
import { TelaLoginComponent } from './components/tela-login/tela-login.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: 'login',
    component: TelaLoginComponent,
  },
  {
    path: 'agendamento',
    component: TabelaSemanalAgendamentoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
