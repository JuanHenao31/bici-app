import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListReservesComponent } from './list-reserve.component';

describe('ListReservesComponent', () => {
  let component: ListReservesComponent;
  let fixture: ComponentFixture<ListReservesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListReservesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListReservesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
