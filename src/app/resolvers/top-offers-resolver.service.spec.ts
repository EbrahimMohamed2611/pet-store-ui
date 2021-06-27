import { TestBed } from '@angular/core/testing';

import { TopOffersResolverService } from './top-offers-resolver.service';

describe('TopOffersResolverService', () => {
  let service: TopOffersResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopOffersResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
