import { TestBed } from '@angular/core/testing';

import { FileIOService } from './file-io.service';

describe('FileIOService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: FileIOService = TestBed.get(FileIOService);
    expect(service).toBeTruthy();
  });
});
