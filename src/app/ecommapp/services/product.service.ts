import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Product } from '../model/product';
import { ProductCategory } from '../model/product-category';




@Injectable({
    providedIn: 'root'
  })
  export class ProductService {

    private baseproductUrl = 'http://localhost:8181/api/products';
    private categoryUrl = 'http://localhost:8181/api/product-category';

    constructor(private httpClient: HttpClient) { }

    getProductCategories(): Observable<ProductCategory[]> {

        return this.httpClient.get<GetProductCategory>(this.categoryUrl).pipe(
          map(response => response._embedded.productCategory)
        );
      }

      getProductList(): Observable<GetProducts> {
      return this.httpClient.get<GetProducts>(this.baseproductUrl);
      }

      getProductListbypage(thePageNumber:  number,thePageSize: number): Observable<GetProducts> {
        return this.httpClient.get<GetProducts>(this.baseproductUrl + "?page=" + thePageNumber +  "&size=" + thePageSize);
        }

      getProductListbycategory(categoryid: number): Observable<GetProducts> {
        return this.httpClient.get<GetProducts>(this.baseproductUrl + "/search/findByCategoryId?id=" + categoryid);
      }

      getProductListbyname(thePage: number,thePageSize: number,value: string): Observable<GetProducts> {
        return this.httpClient.get<GetProducts>(this.baseproductUrl + "/search/findByNameContaining?name=" + value 
        + "&page=" + thePage + "&size=" + thePageSize);
      }

      getProductListbycategorybypage(categoryid: number,thePageNumber:  number,thePageSize: number): Observable<GetProducts> {
        
        return this.httpClient.get<GetProducts>(this.baseproductUrl + "/search/findByCategoryId?id=" + categoryid
        +"&page=" + thePageNumber +  "&size=" + thePageSize);
        
        /*return this.httpClient.get<GetProducts>(this.baseproductUrl + "/search/findByCategoryId?id=" + categoryid);
*/
      }

    getProduct(theProductId: number): Observable<Product> {

        // need to build URL based on product id
        const finalproductUrl = `${this.baseproductUrl}/${theProductId}`;
    
        return this.httpClient.get<Product>(finalproductUrl);
      }



  }

  
  interface GetProductCategory {
    _embedded: {
      productCategory: ProductCategory[];
    }
  }

  interface GetProducts {
    _embedded: {
      products: Product[];
    },
    page: {
      size: number,
      totalElements: number,
      totalPages: number,
      number: number
    }
  }