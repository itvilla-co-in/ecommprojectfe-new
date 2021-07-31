import { Component, OnInit } from '@angular/core';
import { ProductCategory } from '../../model/product-category';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-productcategorylist',
  templateUrl: './productcategorylist.component.html',
  styleUrls: ['./productcategorylist.component.scss','../ecommapphome.component.scss']
})
export class ProductcategorylistComponent implements OnInit {

  productCategories: ProductCategory[] = [];
  
  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.getProductCategories();
  }


  getProductCategories() {

    this.productService.getProductCategories().subscribe(
      data => {
        //console.log('Product Categories from backend =' + JSON.stringify(data));
        this.productCategories = data;
      }
    );
  }



}
