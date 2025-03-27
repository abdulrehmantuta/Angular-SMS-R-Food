import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-main-dashboard',
  templateUrl: './main-dashboard.component.html',
  styleUrls: ['./main-dashboard.component.css']
})
export class MainDashboardComponent implements OnInit{
  Permission: boolean = false;
  
  ngOnInit(): void {
    const Permission = localStorage.getItem('Permission');
    if(Permission === "Full Admin"){
      this.Permission = true;
    }
  }
}
