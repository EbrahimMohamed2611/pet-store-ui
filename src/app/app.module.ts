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
import { ServicesShopComponent } from './component/services-shop/services-shop.component';
import { ServiceComponent } from './component/service/service.component';
import { ServiceInfoComponent } from './component/service-info/service-info.component';
import {ContactUsComponent} from './component/contact-us/contact-us.component';
import {ShoppingCartComponent} from './component/shopping-cart/shopping-cart.component';
import {CheckoutComponent} from './component/checkout/checkout.component';
import {LayoutComponent} from './component/layout/layout.component';
import { ProfileComponent } from './component/profile/profile.component';
import {
  GoogleLoginProvider,
  FacebookLoginProvider, SocialAuthServiceConfig, SocialLoginModule
} from 'angularx-social-login';

import { SuccessComponent } from './component/success/success.component';
import { FailedComponent } from './component/failed/failed.component';

import {JwtHelperService, JwtModule} from '@auth0/angular-jwt';
import {NgxSliderModule} from '@angular-slider/ngx-slider';
import { SearchResultComponent } from './component/search-result/search-result.component';
import { ShortenStringPipe } from './pipe/shorten-string.pipe';

export function getToken(): string {
  return localStorage.getItem('token')!;
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    NotFoundComponent,
    ProfileComponent,
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
    ServicesShopComponent,
    ServiceComponent,
    ServiceInfoComponent,
    ContactUsComponent,
    ShoppingCartComponent,
    CheckoutComponent,
    LayoutComponent,
    SuccessComponent,
    FailedComponent,
    SearchResultComponent,
    ShortenStringPipe


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
        JwtModule.forRoot({
            config: {
                tokenGetter: getToken
            }
        }),
        NgxSliderModule

    ],
  providers: [{provide: HTTP_INTERCEPTORS, useClass: AuthenticationInterceptorService, multi: true},
    JwtHelperService,
    {
      provide: 'SocialAuthServiceConfig',
      useValue: {
        autoLogin: false,
        providers: [
          {
            id: GoogleLoginProvider.PROVIDER_ID,
            provider: new GoogleLoginProvider(
              'GOOGLE_ID'
            )
          },
          {
            id: FacebookLoginProvider.PROVIDER_ID,
            provider: new FacebookLoginProvider('FACEBOOK_ID')
          }
        ]
      } as SocialAuthServiceConfig,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
