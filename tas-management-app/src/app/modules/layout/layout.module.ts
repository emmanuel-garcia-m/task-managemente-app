import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout/layout.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MenuItemComponent } from './components/menu-item/menu-item.component';
import { MaterialModule } from 'src/app/material.module';
import { LayoutRoutingModule } from './layout-routing.module';
import { SharedModule } from '@shared/shared.module';



@NgModule({
  declarations: [
    LayoutComponent,
    NavbarComponent,
    MenuItemComponent
  ],
  imports: [
    CommonModule,
    MaterialModule,
    LayoutRoutingModule,
    SharedModule
  ]
})
export class LayoutModule { }
