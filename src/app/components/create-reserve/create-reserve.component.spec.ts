import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateReserveComponent } from './create-reserve.component';

describe('CreateEmpleadoComponent', () => {
  let component: CreateReserveComponent;
  let fixture: ComponentFixture<CreateReserveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateReserveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateReserveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
