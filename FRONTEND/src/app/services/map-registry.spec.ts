import { TestBed } from '@angular/core/testing';

import { MapRegistry } from './map-registry';

describe('MapRegistry', () => {
  let service: MapRegistry;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MapRegistry);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
