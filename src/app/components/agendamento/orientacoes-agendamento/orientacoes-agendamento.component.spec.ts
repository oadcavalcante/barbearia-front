import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrientacoesAgendamentoComponent } from './orientacoes-agendamento.component';

describe('OrientacoesAgendamentoComponent', () => {
  let component: OrientacoesAgendamentoComponent;
  let fixture: ComponentFixture<OrientacoesAgendamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OrientacoesAgendamentoComponent]
    });
    fixture = TestBed.createComponent(OrientacoesAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
