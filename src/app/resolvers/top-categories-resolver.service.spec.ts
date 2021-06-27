import { TestBed } from '@angular/core/testing';

import { TopCategoriesResolverService } from './top-categories-resolver.service';

describe('TopCategoriesResolverService', () => {
  let service: TopCategoriesResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopCategoriesResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
