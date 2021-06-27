import { TestBed } from '@angular/core/testing';

import { TopRatedResolverService } from './top-rated-resolver.service';

describe('TopRatedResolverService', () => {
  let service: TopRatedResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopRatedResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
