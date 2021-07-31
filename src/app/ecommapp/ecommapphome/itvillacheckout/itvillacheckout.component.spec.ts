import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ItvillacheckoutComponent } from './itvillacheckout.component';

describe('ItvillacheckoutComponent', () => {
  let component: ItvillacheckoutComponent;
  let fixture: ComponentFixture<ItvillacheckoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ItvillacheckoutComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ItvillacheckoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
