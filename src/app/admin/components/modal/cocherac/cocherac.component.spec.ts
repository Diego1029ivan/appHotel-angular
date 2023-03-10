import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CocheracComponent } from './cocherac.component';

describe('CocheracComponent', () => {
  let component: CocheracComponent;
  let fixture: ComponentFixture<CocheracComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CocheracComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CocheracComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
