import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-searchcomp',
  templateUrl: './searchcomp.component.html',
  styleUrls: ['./searchcomp.component.scss']
})
export class SearchcompComponent implements OnInit {
  
  constructor(private router: Router) { }

  ngOnInit(): void {
  }

  Search(value: string) {
    console.log("From Input search"+ `value=${value}`);
    this.router.navigateByUrl(`ecomm/search/${value}`);
  }
}
