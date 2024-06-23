import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaSemanalAgendamentoComponent } from './tabela-semanal-agendamento.component';

describe('TabelaSemanalAgendamentoComponent', () => {
  let component: TabelaSemanalAgendamentoComponent;
  let fixture: ComponentFixture<TabelaSemanalAgendamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabelaSemanalAgendamentoComponent]
    });
    fixture = TestBed.createComponent(TabelaSemanalAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
