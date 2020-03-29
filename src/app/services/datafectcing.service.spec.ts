import { TestBed } from '@angular/core/testing';

import { DatafectcingService } from './datafectcing.service';

describe('DatafectcingService', () => {
  let service: DatafectcingService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DatafectcingService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
