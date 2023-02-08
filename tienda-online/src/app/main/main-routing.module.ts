import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';
import { ProducListComponent } from './produc-list/produc-list.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'products',
    pathMatch: 'full',
  },
  {
    path: 'products',
    component: ProducListComponent,
  },
  {
    path: 'cart',
    component: ShoppingCartComponent,
  },
  
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class MainRoutingModule { }
