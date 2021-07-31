import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductcategorylistComponent } from './productcategorylist.component';

describe('ProductcategorylistComponent', () => {
  let component: ProductcategorylistComponent;
  let fixture: ComponentFixture<ProductcategorylistComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductcategorylistComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductcategorylistComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
