import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardSaleComponent } from './Components/dashboard-sale/dashboard-sale.component';
import { CreateSaleComponent } from './Components/create-sale/create-sale.component';
import { ListSaleComponent } from './Components/list-sale/list-sale.component';
import { SaleRoutingModule } from './sale-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateSaleComponent,
    DashboardSaleComponent,
    ListSaleComponent,
  ],
  imports: [
    CommonModule,
    SaleRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class SaleModule { }
