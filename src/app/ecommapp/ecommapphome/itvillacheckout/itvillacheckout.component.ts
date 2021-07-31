import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { Country } from '../../model/country';
import { myorder } from '../../model/myorder';
import { Order } from '../../model/order';
import { OrderItem } from '../../model/orderitem';
import { State } from '../../model/state';
import { CartserviceService } from '../../services/cartservice.service';
import { nospace } from '../../services/nospace';
import { OrderserviceService } from '../../services/orderservice.service';
import { OtherService } from '../../services/other.service';

@Component({
  selector: 'app-itvillacheckout',
  templateUrl: './itvillacheckout.component.html',
  styleUrls: ['./itvillacheckout.component.scss']
})
export class ItvillacheckoutComponent implements OnInit {

  checkoutFormGroup: FormGroup;
  storage: Storage = sessionStorage;
  totalPrice: number = 0;
  totalQuantity: number = 0;

  cardYears: number[] = [];
  cardMonths: number[] = [];
  countries: Country[] = [];

  deliveryAddressStates: State[] = [];
  billingAddressStates: State[] = [];

  constructor(private formBuilder: FormBuilder,private otherservice: OtherService,
    private cartservice: CartserviceService,
    private orderservice: OrderserviceService,
    private router: Router) { }

  ngOnInit(): void {

    const theEmail = JSON.parse(this.storage.getItem('userEmail'));

      // Reactive Form
      this.checkoutFormGroup = this.formBuilder.group({
        customer: this.formBuilder.group({
        firstName : ['', [Validators.required,Validators.minLength(2),nospace.nospace]],
        lastName  : ['', [Validators.required,Validators.minLength(2),nospace.nospace]],
        email: new FormControl(theEmail,
          [Validators.required, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')])
        }),
        deliveryAddress: this.formBuilder.group({
          Address : ['', [Validators.required,Validators.minLength(5),nospace.nospace]],
          city  : ['', [Validators.required,Validators.minLength(2)]],
          state  : ['', [Validators.required,Validators.minLength(2)]],
          country  : ['', [Validators.required,Validators.minLength(2)]],
          postalcode  : ['', [Validators.required,Validators.minLength(2),nospace.nospace]],
          }),
          billingAddress: this.formBuilder.group({
            Address : ['', [Validators.required,Validators.minLength(5),nospace.nospace]],
            city  : ['', [Validators.required,Validators.minLength(2)]],
            state  : ['', [Validators.required,Validators.minLength(2)]],
            country  : ['', [Validators.required,Validators.minLength(2)]],
            postalcode  : ['', [Validators.required,Validators.minLength(2),nospace.nospace]],
            }),
            carddetails: this.formBuilder.group({
              cardtype : ['', [Validators.required,nospace.nospace]],
              nameoncard  : ['', [Validators.required,Validators.minLength(2),nospace.nospace]],
              cardnumber  : new FormControl('', [Validators.required, Validators.pattern('[0-9]{16}')]),
              cvv  : new FormControl('', [Validators.required, Validators.pattern('[0-9]{3}')]),
              expmonth: [''],
              expyear: ['']
              })

    });
    
     // subscribe to cartService.totalQuantity
     this.cartservice.totalQuantity.subscribe(
      totalQuantity => this.totalQuantity = totalQuantity
    );

    // subscribe to cartService.totalPrice
    this.cartservice.totalPrice.subscribe(
      totalPrice => this.totalPrice = totalPrice
    );

      // data for our card month drop down.. dynamic

      const startMonth: number = new Date().getMonth() + 1;
      //console.log("startMonth: " + startMonth);
      for (let month = startMonth; month <= 12; month++) {
        this.cardMonths.push(month);
      }
      
      const startYear: number = new Date().getFullYear();
      const endYear: number = startYear + 10;

      for (let year = startYear; year <= endYear; year++) {
        this.cardYears.push(year);
      }

      //get the list of countries from backend
      this.otherservice.getCountries().subscribe(
        data => {
          //console.log("countries list from be: " + JSON.stringify(data));
          this.countries = data;
        }
      );

  }

  updatemonths() {
    //console.log("coming in update months...");
    const creditCardFormGroup = this.checkoutFormGroup.get('carddetails');

    const currentYear: number = new Date().getFullYear();
    const selectedYear: number = Number(creditCardFormGroup.value.expyear);    

    let startMonth: number;

    if (currentYear === selectedYear) {
      startMonth = new Date().getMonth() + 1;
    }
    else {
      startMonth = 1;
      //console.log("not current year.... ");
    }
    this.cardMonths = [];
    for (let month = startMonth; month <= 12; month++) {
      this.cardMonths.push(month);
      //console.log("pushing month" + month);
    }
    
  }

  onSubmit() {
    console.log("Handling the submit button" + JSON.stringify(this.checkoutFormGroup.value));
    let myfinalorder = new myorder();
    let order = new Order();
    order.totalPrice = this.totalPrice;
    order.totalQuantity = this.totalQuantity;
    const cartItems = this.cartservice.cartItems;
    let orderItems: OrderItem[] = cartItems.map(tempCartItem => new OrderItem(tempCartItem));
    
    myfinalorder.customer = this.checkoutFormGroup.controls['customer'].value;
    myfinalorder.deliveryAddress = this.checkoutFormGroup.controls['deliveryAddress'].value;
    const shippingState: State = JSON.parse(JSON.stringify(myfinalorder.deliveryAddress.state));
    const shippingCountry: Country = JSON.parse(JSON.stringify(myfinalorder.deliveryAddress.country));
    myfinalorder.deliveryAddress.state = shippingState.name;
    myfinalorder.deliveryAddress.country = shippingCountry.name;
    myfinalorder.billingAddress = this.checkoutFormGroup.controls['billingAddress'].value;
    const billingState: State = JSON.parse(JSON.stringify(myfinalorder.billingAddress.state));
    const billingCountry: Country = JSON.parse(JSON.stringify(myfinalorder.billingAddress.country));
    myfinalorder.billingAddress.state = billingState.name;
    myfinalorder.billingAddress.country = billingCountry.name;
    myfinalorder.order = order;
    myfinalorder.orderItems = orderItems;
     //  API call to store our order
     this.orderservice.myOrder(myfinalorder).subscribe({
      next: response => {
        alert(`Your order is placed.\n Here is yourOrder tracking number, use this for future
        communication : ${response.orderTrackingNumber}`);

        // reset cart
        this.resetCart();

      },
      error: err => {
        alert(`error while placing order : ${err.message}`);
      }
    }
  );

  }

  copyaddress(event){
    if (event.target.checked) {
      this.checkoutFormGroup.controls.billingAddress
            .setValue(this.checkoutFormGroup.controls.deliveryAddress.value);   
    }
    else {
      this.checkoutFormGroup.controls.billingAddress.reset();      
    }
  }

  getthestates(formGroupName: string){
    const formGroup = this.checkoutFormGroup.get(formGroupName);
    //console.log("in get the states method "+ JSON.stringify(formGroup.value));
    const tempcountryCode = formGroup.value.country.code;
    const tempcountryName = formGroup.value.country.name;
    this.otherservice.getStates(tempcountryCode).subscribe(
      data => {

        if (formGroupName === 'deliveryAddress') {
          this.deliveryAddressStates = data; 
        }
        else {
          this.billingAddressStates = data;
        }

        // select first item by default
        formGroup.get('state').setValue(data[0]);
      }
    );

  }

  resetCart() {
   
    this.cartservice.cartItems = [];
    this.cartservice.totalPrice.next(0);
    this.cartservice.totalQuantity.next(0);
    
    // reset the form
    this.checkoutFormGroup.reset();

     
    this.router.navigateByUrl("/ecomm/products");
  }

}
