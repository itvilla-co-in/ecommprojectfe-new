import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-loggedin',
  templateUrl: './loggedin.component.html',
  styleUrls: ['./loggedin.component.scss']
})
export class LoggedinComponent implements OnInit {

  isAuthenticated: boolean = false;


  
  constructor() { }

  ngOnInit(): void {
  }

}
