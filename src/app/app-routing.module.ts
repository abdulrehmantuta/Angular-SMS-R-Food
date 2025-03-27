import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './main-layout/Components/login/login.component';
import { CreateItemComponent } from './Item/Components/create-item/create-item.component';
import { ListItemComponent } from './Item/Components/list-item/list-item.component';
import { AuthService } from './main-layout/Services/interceptors/auth.service';

const routes: Routes = [
  { path: '', redirectTo: 'sign-in', pathMatch: 'full' },
  { path: 'sign-in', component: LoginComponent },
  { path: 'layout', loadChildren: () => import('./main-layout/main-layout.module').then(m => m.MainLayoutModule) },
  { path: 'Item', loadChildren: () => import('./Item/item.module').then(m => m.ItemModule) },
];


@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
