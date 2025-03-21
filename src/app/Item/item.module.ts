import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateItemComponent } from './Components/create-item/create-item.component';
import { ListItemComponent } from './Components/list-item/list-item.component';
import { ItemRoutingModule } from './item-routing.module';
import { SharedModule } from '../shared/shared.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    CreateItemComponent,
    ListItemComponent
  ],
  imports: [
    CommonModule,
    ItemRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ]
})
export class ItemModule { }
