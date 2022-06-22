import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuiaEstiloComponent } from './guia-estilo.component';

describe('GuiaEstiloComponent', () => {
  let component: GuiaEstiloComponent;
  let fixture: ComponentFixture<GuiaEstiloComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GuiaEstiloComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GuiaEstiloComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
