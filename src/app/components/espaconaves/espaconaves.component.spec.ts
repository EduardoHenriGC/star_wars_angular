import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EspaconavesComponent } from './espaconaves.component';

describe('EspaconavesComponent', () => {
  let component: EspaconavesComponent;
  let fixture: ComponentFixture<EspaconavesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EspaconavesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EspaconavesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
