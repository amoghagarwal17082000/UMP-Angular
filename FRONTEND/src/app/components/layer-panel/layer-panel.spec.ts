import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LayerPanel } from './layer-panel';

describe('LayerPanel', () => {
  let component: LayerPanel;
  let fixture: ComponentFixture<LayerPanel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [LayerPanel]
    })
    .compileComponents();

    fixture = TestBed.createComponent(LayerPanel);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
