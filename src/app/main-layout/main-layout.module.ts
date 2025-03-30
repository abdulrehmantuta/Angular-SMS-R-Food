import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from '../shared/shared.module';
import { MainDashboardComponent } from './Components/main-dashboard/main-dashboard.component';
import { LoginComponent } from './Components/login/login.component';
import { MainLayoutRoutingModule } from './main-layout-routing.module';
import { HeaderComponent } from './Components/header/header.component';



@NgModule({
  declarations: [
    LoginComponent,
    MainDashboardComponent,
    HeaderComponent
  ],
  imports: [
   CommonModule,
   MainLayoutRoutingModule,
    SharedModule,
    ReactiveFormsModule,
    FormsModule
  ],

  exports: [
    HeaderComponent
  ]
})
export class MainLayoutModule { }
