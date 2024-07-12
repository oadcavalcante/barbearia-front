import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabelaSemanalAgendamentoComponent } from './components/tabela-semanal-agendamento/tabela-semanal-agendamento.component';
import { LoginComponent } from './auth/pages/login/login.component';
import { OficiaisComponent } from './components/oficiais/oficiais.component';
import { GraduadosComponent } from './components/graduados/graduados.component';
import { AuthGuard } from './auth/auth.guard';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'oficiais', component: OficiaisComponent, canActivate: [AuthGuard] },
  { path: 'graduados', component: GraduadosComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
