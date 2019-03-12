import { TestBed } from '@angular/core/testing';

import { PageStructureService } from './page-structure.service';

describe('PageStructureService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PageStructureService = TestBed.get(PageStructureService);
    expect(service).toBeTruthy();
  });
});
