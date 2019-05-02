import { TestBed } from '@angular/core/testing';

import { ViyaService } from './viya.service';

describe('ViyaService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViyaService = TestBed.get(ViyaService);
    expect(service).toBeTruthy();
  });
});
