import * as L from 'leaflet';
import { Injectable } from '@angular/core';
import { MapLayer } from './interface';

@Injectable({
  providedIn: 'root'
})

export class LayerManager {

  private layers: MapLayer[] = [];

  register(layer: MapLayer) {
    this.layers.push(layer);
  }

  addAll(map: L.Map) {
    this.layers.forEach(layer => layer.addTo(map));
  }

  removeAll(map: L.Map) {
    this.layers.forEach(layer => layer.removeFrom(map));
  }

  reloadAll(map: L.Map) {
    this.layers.forEach(layer => layer.loadForMap(map));
  }

  getLayers(): MapLayer[] {
    return this.layers;
  }

 // Show / hide layers based on `visible` flag
  applyVisibility(map: L.Map) {
    this.layers.forEach(layer => {
      if (layer.visible) {
        layer.addTo(map);
      } else {
        layer.removeFrom(map);
      }
    });
  }

  // Reload ONLY visible layers (called on map move)
  reloadVisible(map: L.Map) {
    this.layers.forEach(layer => {
      if (layer.visible) {
        layer.loadForMap(map);
      }
    });
  }
}
