import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { EditState } from '../../services/edit-state';
import { FormsModule } from '@angular/forms';
import { Api } from '../../services/api';
import { MapRegistry } from '../../services/map-registry';
import { LayerManager } from '../../layers/layer-manager';
import { UiState } from '../../services/ui-state';



@Component({
  selector: 'app-edit-panel',
  imports: [CommonModule, FormsModule],
  templateUrl: './edit-panel.html',
  styleUrl: './edit-panel.css',
})
export class EditPanel {
  saving = false;
  error: string | null = null;

  constructor(
    public edit: EditState,
    private api: Api,
    private mapRegistry: MapRegistry,
    private layerManager: LayerManager,
    public ui: UiState
  ) {}

  close() {
    this.ui.activePanel = null;
  }

  save() {
    if (!this.edit.selectedFeature || !this.edit.draft) return;

    const id =
      this.edit.selectedFeature.id ??
      this.edit.selectedFeature.properties?.id;

    if (!id) {
      this.error = 'Station id not found';
      return;
    }

    this.saving = true;
    this.error = null;

    this.api.updateStation(id, this.edit.draft).subscribe({
      next: () => {
        this.saving = false;

        // reload visible layers (stations)
        if (this.mapRegistry.hasMap()) {
          const map = this.mapRegistry.getMap();
          this.layerManager.reloadVisible(map);
        }

        // clear selection after save
        this.edit.clearSelection();
      },
      error: () => {
        this.saving = false;
        this.error = 'Failed to save changes';
      }
    });
  }

  cancel() {
    this.edit.clearSelection();
  }
}
