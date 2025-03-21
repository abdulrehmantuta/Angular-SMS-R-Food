import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MainLayoutComponent } from './component/main-layout/main-layout.component';

const routes: Routes = [
  {
    path: '',
    component: MainLayoutComponent,  // Apply AuthGuard here to protect all routes
    children: [
      { path: 'Sales', loadChildren: () => import('../Sales/sale.module').then(m => m.SaleModule) },
      { path: 'Order', loadChildren: () => import('../Manage Order/order-management.module').then(m => m.OrderManagementModule) },
      { path: 'Item', loadChildren: () => import('../Item/item.module').then(m => m.ItemModule) },
    ],
  },
];



@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class LayoutRoutingModule {}
