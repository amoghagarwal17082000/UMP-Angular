import { Injectable } from '@angular/core';
import * as L from 'leaflet';

@Injectable({
  providedIn: 'root',
})
export class MapRegistry {
   private map!: L.Map;

  setMap(map: L.Map) {
    this.map = map;
  }

  getMap(): L.Map {
    return this.map;
  }

  hasMap(): boolean {
    return !!this.map;
  }
}
