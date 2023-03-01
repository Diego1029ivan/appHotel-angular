import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListgaleriaComponent } from './listgaleria.component';

describe('ListgaleriaComponent', () => {
  let component: ListgaleriaComponent;
  let fixture: ComponentFixture<ListgaleriaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListgaleriaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListgaleriaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
