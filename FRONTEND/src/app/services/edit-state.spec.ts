import { TestBed } from '@angular/core/testing';

import { EditState } from './edit-state';

describe('EditState', () => {
  let service: EditState;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EditState);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
