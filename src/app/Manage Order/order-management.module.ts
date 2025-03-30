import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateOrderComponent } from './Components/create-order/create-order.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { OrderManagementRoutingModule } from './order-management-routing.module';
import { ListOrderComponent } from './Components/list-order/list-order.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { BrowserModule } from '@angular/platform-browser';
import { NzSpinModule } from 'ng-zorro-antd/spin';



@NgModule({
  declarations: [
    CreateOrderComponent,
    ListOrderComponent
  ],
  imports: [
   CommonModule,
    OrderManagementRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule,
    BrowserModule,
    BrowserModule,
    NzButtonModule,   // Import NzButtonModule
    NzSpinModule,   // Import NzButtonModule
  ]
})
export class OrderManagementModule { }
