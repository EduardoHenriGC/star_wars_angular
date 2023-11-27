import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanetaDetalhesComponent } from './planeta-detalhes.component';

describe('PlanetaDetalhesComponent', () => {
  let component: PlanetaDetalhesComponent;
  let fixture: ComponentFixture<PlanetaDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanetaDetalhesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanetaDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
