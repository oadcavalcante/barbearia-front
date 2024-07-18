import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TabelaSemanalComponent } from './tabela-semanal.component';

describe('TabelaSemanalComponent', () => {
  let component: TabelaSemanalComponent;
  let fixture: ComponentFixture<TabelaSemanalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TabelaSemanalComponent]
    });
    fixture = TestBed.createComponent(TabelaSemanalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
