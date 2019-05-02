import { TestBed } from '@angular/core/testing';

import { ViService } from './vi.service';

describe('ViService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ViService = TestBed.get(ViService);
    expect(service).toBeTruthy();
  });
});
