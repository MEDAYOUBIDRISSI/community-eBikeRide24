import { Component, OnInit } from '@angular/core';
import { NbDialogRef } from '@nebular/theme';
import { Trip } from "./trip.class"
declare const L: any;

@Component({
  selector: 'ngx-map-routing',
  templateUrl: './map-routing.component.html',
  styleUrls: ['./map-routing.component.scss']
})
export class MapRoutingComponent implements OnInit {

  constructor(private dialogRef: NbDialogRef<MapRoutingComponent>) {
  } 
  ourTripe:Trip
  lat_Start:any
  long_Start:any
  lat_End:any
  long_End:any
  close() {
    this.dialogRef.close("goode");
  }

  ngOnInit() {
    if (!navigator.geolocation) {
      console.log('location is not supported');
    }
    // navigator.geolocation.getCurrentPosition((position) => {
    //   const coords = position.coords;
    //   const latLong = [coords.latitude, coords.longitude];
    //   console.log(
    //     `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
    //   );
    //   let mymap = L.map('map').setView(latLong, 13);

    //   L.tileLayer(
    //     'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3VicmF0MDA3IiwiYSI6ImNrYjNyMjJxYjBibnIyem55d2NhcTdzM2IifQ.-NnMzrAAlykYciP4RP9zYQ',
    //     {
    //       attribution:
    //         'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    //       maxZoom: 18,
    //       id: 'mapbox/streets-v11',
    //       tileSize: 512,
    //       zoomOffset: -1,
    //       accessToken: 'your.mapbox.access.token',
    //     }
    //   ).addTo(mymap);


    //   let marker = L.marker(latLong,{draggable:true}).addTo(mymap);

    //   marker.bindPopup('<b>Hi</b>').openPopup();

    //   let popup = L.popup()
    //     .setLatLng(latLong)
    //     .setContent('I am here')
    //     .openOn(mymap);

    //     marker.on('dragend', function(event) {
    //       var latlng = event.target.getLatLng();
    //       console.log(latlng.lat, latlng.lng)
    //     });
    // });

      //  const coords = position.coords;
      const latLong = [31.58, -8.04];
      const latLongEnd = [31.57, -8.03];
      console.log(
        `lat: ${31.58}, lon: ${-8.04}`
      );
      let mymap = L.map('map').setView(latLong, 13);

      L.tileLayer(
        'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1Ijoic3VicmF0MDA3IiwiYSI6ImNrYjNyMjJxYjBibnIyem55d2NhcTdzM2IifQ.-NnMzrAAlykYciP4RP9zYQ',
        {
          attribution:
            'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
          maxZoom: 18,
          id: 'mapbox/streets-v11',
          tileSize: 512,
          zoomOffset: -1,
          accessToken: 'your.mapbox.access.token',
        }
      ).addTo(mymap);
      let custom_icon = L.icon({
        iconUrl: 'assets/images/event.png',
        iconSize: [20, 20],
        iconAnchor: [10, 29],
        popupAnchor: [0, -29]
      });
      let custom_icon_end = L.icon({
        iconUrl: 'assets/images/end.png',
        iconSize: [20, 20],
        iconAnchor: [10, 29],
        popupAnchor: [0, -29]
      });

      let marker = L.marker(latLong,{draggable:true,icon: custom_icon}).addTo(mymap);
      let marker_end = L.marker(latLongEnd,{draggable:true,icon: custom_icon_end}).addTo(mymap);

      marker_end.bindPopup('<b>Hi End From Here</b>').openPopup();
      marker.bindPopup('<b>Hi Start From Here</b>').openPopup();
      

      // let popup = L.popup()
      //   .setLatLng(latLong)
      //   .setContent('For Start')
      //   .openOn(mymap);

      //   let popupEnd = L.popup()
      //   .setLatLng(latLongEnd)
      //   .setContent('For End')
      //   .openOn(mymap);

        marker.on('dragend', function(event) {
          var latlng = event.target.getLatLng();
          localStorage.setItem("startTripeLat",latlng.lat);
          localStorage.setItem("startTripeLng",latlng.lng);
          console.log(localStorage.getItem("startTripeLat"),localStorage.getItem("startTripeLng"))
        });
        marker_end.on('dragend', function(event) {
          var latlng = event.target.getLatLng();
          localStorage.setItem("endTripeLat",latlng.lat);
          localStorage.setItem("endTripeLng",latlng.lng);
          console.log(localStorage.getItem("endTripeLat"),localStorage.getItem("endTripeLng"))
        });
    
    this.watchPosition();
  }

  watchPosition() {
    let desLat = 0;
    let desLon = 0;
    let id = navigator.geolocation.watchPosition(
      (position) => {
        console.log(
          `lat: ${position.coords.latitude}, lon: ${position.coords.longitude}`
        );
        if (position.coords.latitude === desLat) {
          navigator.geolocation.clearWatch(id);
        }
      },
      (err) => {
        console.log(err);
      },
      {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0,
      }
    );
  }
}
