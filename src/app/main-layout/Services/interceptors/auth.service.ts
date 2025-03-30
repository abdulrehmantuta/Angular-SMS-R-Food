import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { SaleService } from '../sale.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService implements CanActivate {
  constructor(
    private router: Router,
    private _SaleService: SaleService,
  ) {}

  canActivate(): boolean {
    const token = localStorage.getItem('token');
    if(token){
      this._SaleService.setSubmittingState(true)
    }

    if (!token) {
      this.router.navigate(['/sign-in']);
      return false;
    }

    return true;
  }
}