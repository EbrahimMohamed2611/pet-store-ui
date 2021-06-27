import { TestBed } from '@angular/core/testing';

import { HomeProductsResolverService } from './home-products-resolver.service';

describe('HomeProductsResolverService', () => {
  let service: HomeProductsResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(HomeProductsResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
