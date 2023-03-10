import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PrecioscComponent } from './preciosc.component';

describe('PrecioscComponent', () => {
  let component: PrecioscComponent;
  let fixture: ComponentFixture<PrecioscComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PrecioscComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PrecioscComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
