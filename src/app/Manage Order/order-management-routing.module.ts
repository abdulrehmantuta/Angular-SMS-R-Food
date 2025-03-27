import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateOrderComponent } from './Components/create-order/create-order.component';
import { ListOrderComponent } from './Components/list-order/list-order.component';
import { AuthService } from '../main-layout/Services/interceptors/auth.service';

const routes: Routes = [
  { path: '', redirectTo: 'Order-Created', pathMatch: 'full' },
  { path: 'Order-Created', component: CreateOrderComponent, canActivate: [AuthService] },
  { path: 'Order-List',component: ListOrderComponent, canActivate: [AuthService]  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class OrderManagementRoutingModule { }
