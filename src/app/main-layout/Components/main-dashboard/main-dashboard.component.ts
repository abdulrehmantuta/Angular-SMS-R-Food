import { Component, OnInit } from '@angular/core';
import { SaleService } from '../../Services/sale.service';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent implements OnInit{
  Permission: boolean = false;
  
  constructor(private _SaleService: SaleService){}

  ngOnInit(): void {
    const Permission = localStorage.getItem('Permission');
    if(Permission === "Full Admin"){
      this.Permission = true;
    }
  }
}
