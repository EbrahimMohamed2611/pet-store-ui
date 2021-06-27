import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';
import {ProductService} from '../service/product/product.service';

@Injectable({
  providedIn: 'root'
})
export class TopOffersResolverService implements Resolve<any> {

  constructor(private productService: ProductService,
              private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.productService.getTopRatedProducts(3)
      .pipe(catchError(e => {
        this.router.navigateByUrl('/notfound');
        return EMPTY;
      }));
    ;
  }
}
