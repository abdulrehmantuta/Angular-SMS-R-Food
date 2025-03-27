import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './Components/login/login.component';
import { MainDashboardComponent } from './Components/main-dashboard/main-dashboard.component';
import { AuthService } from './Services/interceptors/auth.service';

const routes: Routes = [
  { path: '', redirectTo: 'Login', pathMatch: 'full' },
  { path: 'Dashboard',component: MainDashboardComponent, canActivate: [AuthService] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainLayoutRoutingModule { }
