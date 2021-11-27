import { TestBed } from '@angular/core/testing';

import { FeaturetoggleService } from './featuretoggle.service';

describe('FeaturetoggleService', () => {
  let service: FeaturetoggleService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FeaturetoggleService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
