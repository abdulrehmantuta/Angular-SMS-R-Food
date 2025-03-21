import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOrderComponent } from './Components/create-order/create-order.component';
import { ListOrderComponent } from './Components/list-order/list-order.component';

const routes: Routes = [
  { path: '', redirectTo: 'Created', pathMatch: 'full' },
  { path: 'Created', component: CreateOrderComponent },
  { path: 'List',component: ListOrderComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderManagementRoutingModule { }
