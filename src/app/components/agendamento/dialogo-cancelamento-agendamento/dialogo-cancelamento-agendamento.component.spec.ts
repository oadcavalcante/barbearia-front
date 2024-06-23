import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogoCancelamentoAgendamentoComponent } from './dialogo-cancelamento-agendamento.component';

describe('DialogoCancelamentoAgendamentoComponent', () => {
  let component: DialogoCancelamentoAgendamentoComponent;
  let fixture: ComponentFixture<DialogoCancelamentoAgendamentoComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogoCancelamentoAgendamentoComponent]
    });
    fixture = TestBed.createComponent(DialogoCancelamentoAgendamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
