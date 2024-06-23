import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabelaSemanalAgendamentoComponent } from './components/agendamento/tabela-semanal-agendamento/tabela-semanal-agendamento.component';

const routes: Routes = [
  {
    path: '',
    component: TabelaSemanalAgendamentoComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
