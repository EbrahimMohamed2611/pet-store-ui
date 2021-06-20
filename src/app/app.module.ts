import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './component/login/login.component';
import { NotFoundComponent } from './component/not-found/not-found.component';
import { HomeComponent } from './component/home/home.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthenticationInterceptorService } from './service/interceptor/authentication-interceptor.service';
import { HeaderComponent } from './component/header/header.component';
import { FooterComponent } from './component/footer/footer.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { CategoryComponent } from './component/category/category.component';
import { CustomerComponent } from './component/customer/customer.component';
import { ProductComponent } from './component/product/product.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { SpeciesComponent } from './component/species/species.component';
import { ShopComponent } from './component/shop/shop.component';
import { ProductInfoComponent } from './component/product-info/product-info.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { UserDetailsComponent } from './component/admin/user-details/user-details.component';
import { ProductDetailsComponent } from './component/admin/product-details/product-details.component';
import { ServiceDetailsComponent } from './component/admin/service-details/service-details.component';
import { OrderDetailsComponent } from './component/admin/order-details/order-details.component';
import { NgxPaginationModule } from 'ngx-pagination';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,

    HomeComponent,
     HeaderComponent,
     FooterComponent,
     NavbarComponent,
     CategoryComponent,
     CustomerComponent,
     SignUpComponent,
     SpeciesComponent,
     ProductComponent,
     SignUpComponent,
     ShopComponent,
     ProductInfoComponent,
     UserDetailsComponent,
     ProductDetailsComponent,
     ServiceDetailsComponent,
     OrderDetailsComponent


  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    CarouselModule,
    NgxPaginationModule,
    ToastrModule.forRoot(),

  ],
  providers: [{ provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptorService, multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
