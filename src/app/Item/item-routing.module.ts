import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { CreateItemComponent } from './Components/create-item/create-item.component';
import { ListItemComponent } from './Components/list-item/list-item.component';

const routes: Routes = [
  { path: '', redirectTo: 'Created', pathMatch: 'full' },
  { path: 'Created', component: CreateItemComponent },
  { path: 'List',component: ListItemComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ItemRoutingModule { }
