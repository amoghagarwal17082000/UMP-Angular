import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LegendPanel } from './legend-panel';

describe('LegendPanel', () => {
  let component: LegendPanel;
  let fixture: ComponentFixture<LegendPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LegendPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LegendPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
