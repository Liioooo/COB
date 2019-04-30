import {TestBed} from '@angular/core/testing';

import {PageViewGridService} from './page-view-grid.service';

describe('PageViewGridService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageViewGridService = TestBed.get(PageViewGridService);
    expect(service).toBeTruthy();
  });
});
