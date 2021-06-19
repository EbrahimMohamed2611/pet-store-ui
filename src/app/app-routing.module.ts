import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { LoginComponent } from './component/login/login.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import {CategoryComponent} from './component/category/category.component';
import {CustomerComponent} from './component/customer/customer.component';
import {SignUpComponent} from './component/sign-up/sign-up.component';
import { SpeciesComponent } from './component/species/species.component';
import {ShopComponent} from './component/shop/shop.component';
import { ProductInfoComponent } from './component/product-info/product-info.component';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'log-in', component: LoginComponent },
  { path: 'customers', component: CustomerComponent },
  { path: 'categories', component: CategoryComponent },
  { path: 'species', component: SpeciesComponent },
  { path: 'product/:id', component: ProductInfoComponent },
  { path: 'shop', component: ShopComponent },
  { path: '**', component: NotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
