import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {HomeComponent} from './component/home/home.component';
import {LoginComponent} from './component/login/login.component';
import {NotFoundComponent} from './component/not-found/not-found.component';
import {CategoryComponent} from './component/category/category.component';
import {CustomerComponent} from './component/customer/customer.component';
import {SignUpComponent} from './component/sign-up/sign-up.component';
import {SpeciesComponent} from './component/species/species.component';
import {ShopComponent} from './component/shop/shop.component';
import {ShoppingCartComponent} from './component/shopping-cart/shopping-cart.component';
import {CheckoutComponent} from './component/checkout/checkout.component';
import {LayoutComponent} from './component/layout/layout.component';
import {ProductInfoComponent} from './component/product-info/product-info.component';
import {ServicesShopComponent} from './component/services-shop/services-shop.component';
import {ServiceInfoComponent} from './component/service-info/service-info.component';
import {SuccessComponent} from './component/success/success.component';
import {FailedComponent} from './component/failed/failed.component';
import {AuthenticationGuard} from './guards/authentication/authentication.guard';
import {LoginGuard} from './guards/login/login.guard';
import {ContactUsComponent} from './component/contact-us/contact-us.component';
import {AboutUsComponent} from './component/about-us/about-us.component';
import {TopRatedResolverService} from './resolvers/top-rated-resolver.service';
import {TopCategoriesResolverService} from './resolvers/top-categories-resolver.service';
import {TopOffersResolverService} from './resolvers/top-offers-resolver.service';
import {HomeProductsResolverService} from './resolvers/home-products-resolver.service';
import { ProfileComponent } from './component/profile/profile.component';
import {SearchResultComponent} from './component/search-result/search-result.component';

const routes: Routes = [
  {
    path: '', component: LayoutComponent,
    children: [
      {path: '', pathMatch: 'full', redirectTo: 'home'},
      {
        path: 'home', component: HomeComponent, resolve: {
          topRates: TopRatedResolverService,
          products: HomeProductsResolverService,
          topOffers: TopOffersResolverService,
          topCategories: TopCategoriesResolverService
        }
      },
      {path: 'customers', component: CustomerComponent},
      {path: 'categories', component: CategoryComponent},
      {path: 'species', component: SpeciesComponent},
      {path: 'product/:id', component: ProductInfoComponent},
      {path: 'shop', component: ShopComponent},
      {path: 'failed', pathMatch: 'full', redirectTo:'cart'},
      {path: 'services', component: ServicesShopComponent},
      {path: 'service/:id', component: ServiceInfoComponent},
      {path: 'customer/profile', component: ProfileComponent, canActivate: [AuthenticationGuard]},
      {path: 'success', component: SuccessComponent},
      {path: 'contacts', component: ContactUsComponent},
      {path: 'about-us', component: AboutUsComponent},
      {path: 'cart', component: ShoppingCartComponent, canActivate: [AuthenticationGuard]},
      {path: 'checkout', component: CheckoutComponent, canActivate: [AuthenticationGuard]},
      {path: 'result/:query', component: SearchResultComponent}
    ]
  },
  {path: 'signup', component: SignUpComponent, canActivate: [LoginGuard]},
  {path: 'login', component: LoginComponent, canActivate: [LoginGuard]},
  {path: '**', component: NotFoundComponent, canActivate: [LoginGuard]}

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
