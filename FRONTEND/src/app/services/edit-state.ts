import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class EditState {

  enabled = false;        // Edit mode ON / OFF
  selectedFeature: any = null;
   draft: any = null;

  enable() {
    this.enabled = true;
    this.selectedFeature = null;
  }

  disable() {
    this.enabled = false;
    this.selectedFeature = null;
  }

  select(feature: any) {
    if (!this.enabled) return;
    this.selectedFeature = feature;

     // create editable copy of properties
    this.draft = { ...feature.properties };
  }

  clearSelection() {
    this.selectedFeature = null;
  }
  
}
