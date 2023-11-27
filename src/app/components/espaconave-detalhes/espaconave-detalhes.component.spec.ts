import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaconaveDetalhesComponent } from './espaconave-detalhes.component';

describe('EspaconaveDetalhesComponent', () => {
  let component: EspaconaveDetalhesComponent;
  let fixture: ComponentFixture<EspaconaveDetalhesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspaconaveDetalhesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspaconaveDetalhesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
