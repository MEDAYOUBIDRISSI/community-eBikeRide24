import { Component } from '@angular/core';
import {
  latLng,
  tileLayer
} from 'leaflet';

import * as L from 'leaflet';

@Component({
  selector: 'ngx-leaflet',
  styleUrls: ['./leaflet.component.scss'],
  template: `
    <nb-card>
      <nb-card-header>Leaflet Maps</nb-card-header>
      <nb-card-body>
        <div leaflet [leafletOptions]="options"
        (leafletMapReady)="onMapReady($event)"></div>
      </nb-card-body>
      <button (click)="changeView()">Change view</button>
    </nb-card>
  `,
})
export class LeafletComponent {

  map: L.Map;
  options = {
    layers: [
      L.tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', { maxZoom: 18, attribution: '...' }),
    ],
    zoom: 5,
    center: L.latLng({ lat: 38.991709, lng: -76.886109 }),
  };

  onMapReady(map: L.Map) {
    this.map = map;
}

// change the view using that map reference to another location
  changeView() {
      this.map.panTo(new L.LatLng(40.737, -73.923));
  }
}
