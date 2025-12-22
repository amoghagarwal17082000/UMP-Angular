import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class FilterState {
    stationCode: string = '';
    division: string = '';

  reset() {
    this.stationCode = '';
    this.division = '';
  }
}
