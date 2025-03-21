import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateSaleComponent } from './Components/create-sale/create-sale.component';
import { ListSaleComponent } from './Components/list-sale/list-sale.component';
import { DashboardSaleComponent } from './Components/dashboard-sale/dashboard-sale.component';

const routes: Routes = [
  { path: '', redirectTo: 'Created', pathMatch: 'full' },
  { path: 'Created', component: CreateSaleComponent },
  { path: 'List',component: ListSaleComponent },
  { path: 'dashboard',component: DashboardSaleComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SaleRoutingModule { }

