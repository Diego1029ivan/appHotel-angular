import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListpicinaComponent } from './listpicina.component';

describe('ListpicinaComponent', () => {
  let component: ListpicinaComponent;
  let fixture: ComponentFixture<ListpicinaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListpicinaComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListpicinaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
