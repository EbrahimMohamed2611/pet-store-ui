import {Injectable} from '@angular/core';
import {CategoryService} from '../service/category/category.service';
import {ActivatedRouteSnapshot, Resolve, Router, RouterStateSnapshot} from '@angular/router';
import {EMPTY, Observable} from 'rxjs';
import {catchError} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TopCategoriesResolverService implements Resolve<any> {

  constructor(private categoryService: CategoryService, private router: Router) {
  }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<any> | Promise<any> | any {
    return this.categoryService.getTheFirstThreeCategories(3)
      .pipe(catchError(e => {
        this.router.navigateByUrl('/notfound');
        return EMPTY;
      }));
  }


}
