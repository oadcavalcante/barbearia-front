import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { TabelaSemanalAgendamentoComponent } from './components/agendamento/tabela-semanal-agendamento/tabela-semanal-agendamento.component';
import { OficiaisComponent } from './pages/oficiais/oficiais.component';
import { GraduadosComponent } from './pages/graduados/graduados.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './pages/login/login.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  { path: 'oficiais', component: OficiaisComponent, data: { title: 'Oficiais' }, canActivate: [AuthGuard] },
  { path: 'graduados', component: GraduadosComponent, data: { title: 'Graduados' }, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
