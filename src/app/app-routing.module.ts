import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { OficiaisComponent } from './pages/oficiais/oficiais.component';
import { GraduadosComponent } from './pages/graduados/graduados.component';
import { AuthGuard } from './auth/auth.guard';
import { LoginComponent } from './pages/login/login.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent, data: { title: 'Login' } },
  { path: 'oficiais', component: OficiaisComponent, data: { title: 'Oficiais' }, canActivate: [AuthGuard] },
  { path: 'graduados', component: GraduadosComponent, data: { title: 'Graduados' }, canActivate: [AuthGuard] },
  { path: '**', component: NotFoundComponent } // Captura todas as rotas não definidas
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule] 
})
export class AppRoutingModule { }
