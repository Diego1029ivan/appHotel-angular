import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PicinacComponent } from './picinac.component';

describe('PicinacComponent', () => {
  let component: PicinacComponent;
  let fixture: ComponentFixture<PicinacComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PicinacComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PicinacComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
