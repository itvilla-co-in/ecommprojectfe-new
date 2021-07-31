import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProddetailsComponent } from './proddetails.component';

describe('ProddetailsComponent', () => {
  let component: ProddetailsComponent;
  let fixture: ComponentFixture<ProddetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProddetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProddetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
