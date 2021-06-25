import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {LoginComponent} from './component/login/login.component';
import {NotFoundComponent} from './component/not-found/not-found.component';
import {HomeComponent} from './component/home/home.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {AuthenticationInterceptorService} from './service/interceptor/authentication-interceptor.service';
import {HeaderComponent} from './component/header/header.component';
import {FooterComponent} from './component/footer/footer.component';
import {NavbarComponent} from './component/navbar/navbar.component';
import {CategoryComponent} from './component/category/category.component';
import {CustomerComponent} from './component/customer/customer.component';
import {ProductComponent} from './component/product/product.component';
import {SignUpComponent} from './component/sign-up/sign-up.component';
import {ToastrModule} from 'ngx-toastr';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {SpeciesComponent} from './component/species/species.component';
import {ShopComponent} from './component/shop/shop.component';
import {ProductInfoComponent} from './component/product-info/product-info.component';
import {CarouselModule} from 'ngx-owl-carousel-o';
import {NgxPaginationModule} from 'ngx-pagination';
import {AboutUsComponent} from './component/about-us/about-us.component';

import {ContactUsComponent} from './component/contact-us/contact-us.component';

import {ShoppingCartComponent} from './component/shopping-cart/shopping-cart.component';
import {CheckoutComponent} from './component/checkout/checkout.component';
import {LayoutComponent} from './component/layout/layout.component';
import {
  GoogleLoginProvider,
  FacebookLoginProvider, SocialAuthServiceConfig, SocialLoginModule
} from 'angularx-social-login';


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
    AboutUsComponent,

    ContactUsComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    LayoutComponent


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
    SocialLoginModule,


  ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptorService, multi: true},
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              '150394644628-b6rfj7tbi4pv0cguooulnsomi7a4p1qv.apps.googleusercontent.com'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('950564655732078')
          }
        ]
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
