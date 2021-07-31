import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EcommapphomeComponent } from './ecommapphome.component';

describe('EcommapphomeComponent', () => {
  let component: EcommapphomeComponent;
  let fixture: ComponentFixture<EcommapphomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EcommapphomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EcommapphomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
