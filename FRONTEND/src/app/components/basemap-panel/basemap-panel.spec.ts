import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BasemapPanel } from './basemap-panel';

describe('BasemapPanel', () => {
  let component: BasemapPanel;
  let fixture: ComponentFixture<BasemapPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BasemapPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BasemapPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
