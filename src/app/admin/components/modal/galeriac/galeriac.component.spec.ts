import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GaleriacComponent } from './galeriac.component';

describe('GaleriacComponent', () => {
  let component: GaleriacComponent;
  let fixture: ComponentFixture<GaleriacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GaleriacComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(GaleriacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
