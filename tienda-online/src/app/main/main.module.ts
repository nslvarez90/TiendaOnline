import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { MainRoutingModule } from './main-routing.module';
import { ProducListComponent } from './produc-list/produc-list.component';
import { ProductSingleComponent } from './product-single/product-single.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';


@NgModule({
  declarations: [
    ProducListComponent,
    ProductSingleComponent,
    ShoppingCartComponent
  ],
  imports: [
    CommonModule,
    MainRoutingModule
  ]
})
export class MainModule { }
