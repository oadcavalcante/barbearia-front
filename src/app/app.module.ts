import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

// formulários e requisições
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

//roteamento
import { RouterModule } from '@angular/router';
import { AppRoutingModule } from './app-routing.module';

// componentes gerais
import { RodapeComponent } from './components/layout/rodape/rodape.component';

// angular material
import { MatTableModule } from '@angular/material/table';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatIconModule } from '@angular/material/icon';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatDialogModule } from '@angular/material/dialog';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';

// componentes do agendamento
import { TabelaSemanalComponent } from './components/agendamento/tabela-semanal/tabela-semanal.component';
import { DialogoAgendamentoComponent } from './components/agendamento/dialogo-agendamento/dialogo-agendamento.component';
import { DialogoCancelamentoComponent } from './components/agendamento/dialogo-cancelamento/dialogo-cancelamento.component';
import { OrientacoesComponent } from './components/agendamento/orientacoes/orientacoes.component';

// módulo de animações
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraduadosComponent } from './pages/graduados/graduados.component';
import { OficiaisComponent } from './pages/oficiais/oficiais.component';
import { LoginComponent } from './pages/login/login.component';
import { HeaderComponent } from './components/layout/header/header.component';
import { DialogoLogoutComponent } from './components/layout/dialogo-logout/dialogo-logout.component';
import { NotFoundComponent } from './pages/not-found/not-found.component';

@NgModule({
  declarations: [
    AppComponent,
    RodapeComponent,
    DialogoAgendamentoComponent,
    DialogoCancelamentoComponent,
    OrientacoesComponent,
    TabelaSemanalComponent,
    GraduadosComponent,
    OficiaisComponent,
    LoginComponent,
    HeaderComponent,
    DialogoLogoutComponent,
    NotFoundComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,

    HttpClientModule,
    RouterModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    MatTableModule,
    MatButtonModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSnackBarModule,
    MatDialogModule,
    MatListModule,
    MatSelectModule,
    MatCheckboxModule,

    //Módulo de Animações
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
