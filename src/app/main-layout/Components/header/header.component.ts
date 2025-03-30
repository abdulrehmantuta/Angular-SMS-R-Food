import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { SaleService } from '../../Services/sale.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent {
  constructor(
    private _Route: Router,
    private _SaleService: SaleService,
  ) {
  }
  onLogout(){
    this._Route.navigate(['/sign-in']);
    this._SaleService.setSubmittingState(false)
    localStorage.removeItem('token');
  }
}
