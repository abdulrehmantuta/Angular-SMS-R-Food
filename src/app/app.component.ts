import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { SaleService } from './main-layout/Services/sale.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'Client';
  isAdmin:string=''
  hide: boolean = true;
  constructor(private _SaleService: SaleService){}

  ngOnInit(): void {
    const token = localStorage.getItem('token');
    if(!token){
      this.hide = false;
    } else {
      this.hide = true;
    }  
    this._SaleService.isSubmitting$.subscribe((value) => {
      this.hide = value;
    });
  }
}
