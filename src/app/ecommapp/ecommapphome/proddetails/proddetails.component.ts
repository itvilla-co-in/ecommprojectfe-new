import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../../model/cartitem';
import { Product } from '../../model/product';
import { CartserviceService } from '../../services/cartservice.service';
import { ProductService } from '../../services/product.service';

@Component({
  selector: 'app-proddetails',
  templateUrl: './proddetails.component.html',
  styleUrls: ['./proddetails.component.scss']
})
export class ProddetailsComponent implements OnInit {

  product: Product = new Product();
  
  constructor(private productService: ProductService,private route: ActivatedRoute,
    private cartservice:CartserviceService) { }

  ngOnInit(): void {
    this.route.paramMap.subscribe(() => {
      // get the "id" param string. convert string to a number using the "+" symbol
    const theProductId: number = parseInt(this.route.snapshot.paramMap.get('id'));
    this.productService.getProduct(theProductId).subscribe(
      data => {
        this.product = data;
      }
    )

    })
  }

  addToCart(){
    const theCartItem = new CartItem(this.product);
    this.cartservice.addToCart(theCartItem);
  }
}
