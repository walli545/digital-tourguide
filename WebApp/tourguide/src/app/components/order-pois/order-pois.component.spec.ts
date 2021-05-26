import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderPoisComponent } from './order-pois.component';

describe('OrderPoisComponent', () => {
  let component: OrderPoisComponent;
  let fixture: ComponentFixture<OrderPoisComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [OrderPoisComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderPoisComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
