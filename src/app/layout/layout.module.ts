import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { LayoutRoutingModule } from './layout-routing.module';
import { SharedModule } from '../shared/shared.module';
import { AuthLayoutComponent } from './component/auth-layout/auth-layout.component';
import { MainLayoutComponent } from './component/main-layout/main-layout.component';
import { NavLeftComponent } from './component/nav-bar/nav-left/nav-left.component';
import { NavRightComponent } from './component/nav-bar/nav-right/nav-right.component';
import { NavigationComponent } from './component/navigation/navigation.component';
import { NavContentComponent } from './component/navigation/nav-content/nav-content.component';
import { NavGroupComponent } from './component/navigation/nav-content/nav-group/nav-group.component';
import { NavCollapseComponent } from './component/navigation/nav-content/nav-collapse/nav-collapse.component';
import { NavItemComponent } from './component/navigation/nav-content/nav-item/nav-item.component';
import { NavBarComponent } from './component/nav-bar/nav-bar.component';
import { RouterModule } from '@angular/router';


@NgModule({
  declarations: [
    AuthLayoutComponent,
    MainLayoutComponent,
    NavLeftComponent,
    NavRightComponent,
    NavigationComponent,
    NavContentComponent,
    NavGroupComponent,
    NavCollapseComponent,
    NavItemComponent,
    NavBarComponent
  ],
  imports: [
    CommonModule,
    LayoutRoutingModule,
    SharedModule,
    RouterModule
  ]
})
export class LayoutModule { }
