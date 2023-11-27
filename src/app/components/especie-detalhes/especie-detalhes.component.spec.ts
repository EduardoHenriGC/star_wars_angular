import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspecieDetalhesComponent } from './especie-detalhes.component';

describe('EspecieDetalhesComponent', () => {
  let component: EspecieDetalhesComponent;
  let fixture: ComponentFixture<EspecieDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspecieDetalhesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspecieDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
