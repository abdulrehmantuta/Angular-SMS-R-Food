import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Sale } from 'src/app/Item/interface/item';
import { SaleService } from 'src/app/main-layout/Services/sale.service';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-list-order',
  templateUrl: './list-order.component.html',
  styleUrls: ['./list-order.component.css']
})
export class ListOrderComponent implements OnInit {
  SaleRes: Sale[] = [];
  filteredSales: Sale[] = [];
  searchQuery: string = '';

  constructor(
    private _SaleService: SaleService,
    private _Router: Router,
  ) {}

  ngOnInit(): void {
    this.onGet();
  }

  onGet() {
    this._SaleService.getSales().subscribe(res => {
      this.SaleRes = res;
      this.filteredSales = res; // ✅ Default me poora data dikhao
    });
  }

  filterSales() {
    this.filteredSales = this.SaleRes.filter(sale =>
      sale.invoiceNumber.toLowerCase().includes(this.searchQuery.toLowerCase())
    );
  }

  OrderEdit(Id: number) {
    this._Router.navigate(['/Order-Created']);
    localStorage.setItem('SaleId', Id.toString());
  }
}