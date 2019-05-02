import { TestBed } from '@angular/core/testing';

import { MasService } from './mas.service';

describe('MasService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: MasService = TestBed.get(MasService);
    expect(service).toBeTruthy();
  });
});
