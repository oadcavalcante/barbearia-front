import { AppComponent } from './app.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

// formulários e requisições
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';

//roteamento
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

// componentes do agendamento
import { TabelaSemanalAgendamentoComponent } from './components/agendamento/tabela-semanal-agendamento/tabela-semanal-agendamento.component';
import { DialogoAgendamentoComponent } from './components/agendamento/dialogo-agendamento/dialogo-agendamento.component';
import { DialogoCancelamentoAgendamentoComponent } from './components/agendamento/dialogo-cancelamento-agendamento/dialogo-cancelamento-agendamento.component';
import { OrientacoesAgendamentoComponent } from './components/agendamento/orientacoes-agendamento/orientacoes-agendamento.component';

@NgModule({
  declarations: [
    AppComponent,
    RodapeComponent,
    DialogoAgendamentoComponent,
    DialogoCancelamentoAgendamentoComponent,
    OrientacoesAgendamentoComponent,
    TabelaSemanalAgendamentoComponent
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
    MatSelectModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
