import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VeiculoDetalhesComponent } from './veiculo-detalhes.component';

describe('VeiculoDetalhesComponent', () => {
  let component: VeiculoDetalhesComponent;
  let fixture: ComponentFixture<VeiculoDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VeiculoDetalhesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(VeiculoDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
