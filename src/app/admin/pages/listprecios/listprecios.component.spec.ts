import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpreciosComponent } from './listprecios.component';

describe('ListpreciosComponent', () => {
  let component: ListpreciosComponent;
  let fixture: ComponentFixture<ListpreciosComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListpreciosComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListpreciosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
