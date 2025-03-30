import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateItemComponent } from './Components/create-item/create-item.component';
import { ListItemComponent } from './Components/list-item/list-item.component';
import { AuthService } from '../main-layout/Services/interceptors/auth.service';

const routes: Routes = [
  { path: '', redirectTo: 'Item-Created', pathMatch: 'full' },
  { path: 'Item-Created', component: CreateItemComponent, canActivate: [AuthService ] },
  { path: 'Item-List',component: ListItemComponent, canActivate: [AuthService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
