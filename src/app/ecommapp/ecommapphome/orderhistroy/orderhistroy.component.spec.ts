import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderhistroyComponent } from './orderhistroy.component';

describe('OrderhistroyComponent', () => {
  let component: OrderhistroyComponent;
  let fixture: ComponentFixture<OrderhistroyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderhistroyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderhistroyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
