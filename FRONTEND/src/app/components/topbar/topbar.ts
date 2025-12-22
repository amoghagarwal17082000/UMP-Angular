import { Component } from '@angular/core';
import { UiState } from '../../services/ui-state';
import { EditState } from '../../services/edit-state';



@Component({
  selector: 'app-topbar',
  imports: [],
  templateUrl: './topbar.html',
  styleUrl: './topbar.css',
})
export class Topbar {

  constructor(
    public ui: UiState,
    private edit: EditState
  ){}


 toggle(panel: string) {
  if (panel === 'edit') {
    this.edit.enabled ? this.edit.disable() : this.edit.enable();
    this.ui.activePanel = this.edit.enabled ? 'edit' : null;
    return;
  }

  this.ui.activePanel = this.ui.activePanel === panel ? null : panel;
}
}
