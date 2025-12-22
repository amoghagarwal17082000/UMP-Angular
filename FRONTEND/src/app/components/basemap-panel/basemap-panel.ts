import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { UiState } from '../../services/ui-state';
import { MapRegistry } from '../../services/map-registry';
import * as L from 'leaflet';

@Component({
  selector: 'app-basemap-panel',
  imports: [CommonModule],
  templateUrl: './basemap-panel.html',
  styleUrl: './basemap-panel.css',
})
export class BasemapPanel {

    constructor(
    public ui: UiState,
    private mapRegistry: MapRegistry
  ) {}

  close() {
    this.ui.activePanel = null;
  }

  setBasemap(type: 'osm' | 'satellite') {
    if (!this.mapRegistry.hasMap()) return;

    const map = this.mapRegistry.getMap();

    // Remove existing basemap
    map.eachLayer(layer => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    // Add selected basemap
    if (type === 'osm') {
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxNativeZoom: 17,
        maxZoom: 22,
        attribution: '&copy; OpenStreetMap contributors'
      }).addTo(map);
    }

    if (type === 'satellite') {
      L.tileLayer(
        'https://server.arcgisonline.com/ArcGIS/rest/services/' +
        'World_Imagery/MapServer/tile/{z}/{y}/{x}',
        {
          maxZoom: 22,
          attribution: 'Tiles © Esri'
        }
      ).addTo(map);
    }
  }
}
