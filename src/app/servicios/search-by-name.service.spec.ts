import { TestBed } from '@angular/core/testing';

import { SearchByNameService } from './search-by-name.service';

describe('SearchByNameService', () => {
  let service: SearchByNameService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SearchByNameService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
