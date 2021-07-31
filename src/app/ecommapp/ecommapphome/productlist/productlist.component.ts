import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CartItem } from '../../model/cartitem';
import { Product } from '../../model/product';
import { CartserviceService } from '../../services/cartservice.service';
import { ProductService } from '../../services/product.service';
 
@Component({
  selector: 'app-productlist',
  templateUrl: './productlist.component.html',
  styleUrls: ['./productlist.component.scss']
})
export class ProductlistComponent implements OnInit {

  products: Product[] = [];
   
  categoryidtemp: number = 0;


  // new properties for pagination
  thePageNumber: number = 1;
  thePageSize: number = 5;
  theTotalElements: number = 0;

  constructor(private route: ActivatedRoute,
    private productService: ProductService,
    private cartservice: CartserviceService) { }

  ngOnInit(): void {
    console.log("coming in product list cmponent ");
    this.categoryidtemp = 0;
    this.thePageNumber=1;
    this.theTotalElements=0;

    this.route.paramMap.subscribe(() => {
     this.categoryidtemp = 0;

      if (this.route.snapshot.paramMap.has('id')) {
        this.categoryidtemp = Number(this.route.snapshot.paramMap.get('id'));
       this.getProducts(this.categoryidtemp);
      }else if (this.route.snapshot.paramMap.has('value')){
        console.log("getting value");
        this.getallProductsbyname(String(this.route.snapshot.paramMap.get('value')));
      }       
      else {
        console.log("no param");
        this.getallProducts();
      }

    });


  }



  onPagechange(event: number){
    this.thePageNumber = event;
    //console.log("coming to the page number " + this.thePageNumber);

    this.route.paramMap.subscribe(() => {
      this.categoryidtemp = 0;
       if (this.route.snapshot.paramMap.has('id')) {
         this.categoryidtemp = Number(this.route.snapshot.paramMap.get('id'));
         this.productService.getProductListbycategorybypage(this.categoryidtemp,this.thePageNumber-1,this.thePageSize).subscribe(
          data => {
            this.products = data._embedded.products;
            this.thePageNumber = data.page.number + 1;
            this.thePageSize = data.page.size;
            this.theTotalElements = data.page.totalElements;
            });
       } else if (this.route.snapshot.paramMap.has('value')){
        console.log("getting value");
        this.getallProductsbynamebypage(this.thePageNumber-1,this.thePageSize,String(this.route.snapshot.paramMap.get('value')));
      }   
       
       else {
         this.getallProductsbypage(this.thePageNumber-1,this.thePageSize);
       }
 
     });


   
    }
    

    getProducts(categoryidtemp: number) {
      this.thePageNumber=1;
     this.theTotalElements=0;
     /*this.productService.getProductListbycategory(categoryidtemp).subscribe(
       data => {
         this.products = data._embedded.products;
       }
     );*/
     this.productService.getProductListbycategorybypage(this.categoryidtemp,this.thePageNumber-1,this.thePageSize).subscribe(
       data => {
         this.products = data._embedded.products;
         this.thePageNumber = data.page.number + 1;
         this.thePageSize = data.page.size;
         this.theTotalElements = data.page.totalElements;
         });
 
   }
 
   getallProducts() {
     this.thePageNumber=1;
     this.theTotalElements=0;
     
     this.productService.getProductListbypage(this.thePageNumber-1,this.thePageSize).subscribe(
       data => {
         this.products = data._embedded.products;
         this.thePageNumber = data.page.number + 1;
         this.thePageSize = data.page.size;
         this.theTotalElements = data.page.totalElements;
       }
     );
   }
 
   getallProductsbypage(pn: number,size:number) {
     
     this.theTotalElements=0;
     /*
     this.productService.getProductList().subscribe(
       data => {
         this.products = data._embedded.products;
       }
     );
     */
     this.productService.getProductListbypage(pn,size).subscribe(
       data => {
         this.products = data._embedded.products;
         this.thePageNumber = data.page.number + 1;
         this.thePageSize = data.page.size;
         this.theTotalElements = data.page.totalElements;
       }
     );
   }
 
   getallProductsbyname(arg0: string) {
     this.thePageNumber=1;
     this.theTotalElements=0;
     this.productService.getProductListbyname(this.thePageNumber-1,this.thePageSize,arg0).subscribe(data => {
       this.products = data._embedded.products;
       this.thePageNumber = data.page.number + 1;
       this.thePageSize = data.page.size;
       this.theTotalElements = data.page.totalElements;
     });
   }
  
   getallProductsbynamebypage(pn: number,size:number,arg0: string) {
     
     this.theTotalElements=0;
     this.productService.getProductListbyname(pn,size,arg0).subscribe(data => {
       this.products = data._embedded.products;
       this.thePageNumber = data.page.number + 1;
       this.thePageSize = data.page.size;
       this.theTotalElements = data.page.totalElements;
     });
   }

   addToCart(tempProduct: Product){
    console.log("adding to cart from product list component. " + tempProduct.name + "added");
    const theCartItem = new CartItem(tempProduct);
    this.cartservice.addToCart(theCartItem);
  }



}
