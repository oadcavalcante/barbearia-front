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
import { RodapeComponent } from './components/rodape/rodape.component';

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
import { TabelaSemanalAgendamentoComponent } from './components/tabela-semanal-agendamento/tabela-semanal-agendamento.component';
import { DialogoAgendamentoComponent } from './components/dialogo-agendamento/dialogo-agendamento.component';
import { DialogoCancelamentoAgendamentoComponent } from './components/dialogo-cancelamento-agendamento/dialogo-cancelamento-agendamento.component';
import { OrientacoesAgendamentoComponent } from './components/orientacoes-agendamento/orientacoes-agendamento.component';

// módulo de animações
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { GraduadosComponent } from './components/graduados/graduados.component';
import { OficiaisComponent } from './components/oficiais/oficiais.component';
import { LoginComponent } from './auth/pages/login/login.component';

@NgModule({
  declarations: [
    AppComponent,
    RodapeComponent,
    DialogoAgendamentoComponent,
    DialogoCancelamentoAgendamentoComponent,
    OrientacoesAgendamentoComponent,
    TabelaSemanalAgendamentoComponent,
    GraduadosComponent,
    OficiaisComponent,
    LoginComponent,
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
