import * as L from 'leaflet';
import { Api } from '../services/api';
import { MapLayer } from './interface';
import { FilterState } from '../services/filter-state';
import { EditState } from '../services/edit-state';

export class StationLayer implements MapLayer {
  id = 'stations';
  title = 'Stations';
  visible = true;

  // ✅ minimum zoom to show stations + labels
  private readonly MIN_ZOOM = 8;

  legend = {
    type: 'point' as const,
    color: '#d32f2f',
    label: 'Railway Station',
  };

  private layer!: L.GeoJSON;
  private lastBbox = '';
  private isOnMap = false; // track whether added to map

  constructor(
    private api: Api,
    private filters: FilterState,
    private edit: EditState
  ) {
    this.layer = L.geoJSON(null, {
      pointToLayer: (feature: any, latlng: L.LatLng) => {
        const marker = L.circleMarker(latlng, {
          radius: 5,
          fillColor: '#d32f2f',
          color: '#ffffff',
          weight: 1,
          opacity: 1,
          fillOpacity: 0.9,
        });

        // ✅ Station name label (permanent)
        const p = feature?.properties || {};
        const name = (p.sttnname || '').toString().trim();

        if (name) {
          marker.bindTooltip(name, {
            permanent: true,
            direction: 'top',
            offset: L.point(0, -8),
            opacity: 0.95,
            className: 'station-label', // style in CSS if you want
          });
        }

        return marker;
      },

      onEachFeature: (feature: any, layer: any) => {
        const p: any = feature.properties || {};

        layer.bindPopup(`
          <b>${p.sttnname || 'Station'}</b><br>
          Code: ${p.sttncode || '-'}
        `);

        layer.on('click', () => {
          this.edit.select(feature);
        });
      },
    });
  }

  addTo(map: L.Map) {
    // Only add if allowed by zoom
    if (this.visible && map.getZoom() >= this.MIN_ZOOM) {
      this.layer.addTo(map);
      this.isOnMap = true;
    } else {
      this.isOnMap = false;
    }
  }

  removeFrom(map: L.Map) {
    if (map.hasLayer(this.layer)) map.removeLayer(this.layer);
    this.isOnMap = false;
  }

  loadForMap(map: L.Map) {
    if (!this.visible) return;

    // ✅ Zoom gate: hide layer when zoom < 8
    const z = map.getZoom();
    if (z < this.MIN_ZOOM) {
      if (this.isOnMap) this.removeFrom(map);
      return;
    }

    // Ensure layer is on map at zoom >= 8
    if (!this.isOnMap) this.addTo(map);

    // Load by bbox (only when zoom >= 8)
    const bounds = map.getBounds();
    const bbox = `${bounds.getWest()},${bounds.getSouth()},${bounds.getEast()},${bounds.getNorth()}`;

    if (bbox === this.lastBbox) return;
    this.lastBbox = bbox;

    this.api.getStations(bbox, this.filters.stationCode, this.filters.division).subscribe({
      next: (geojson: any) => {
        this.layer.clearLayers();
        this.layer.addData(geojson);
      },
      error: (err: any) => console.error('Station layer error', err),
    });
  }
}
