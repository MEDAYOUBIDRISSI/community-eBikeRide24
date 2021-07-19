import { Component, OnInit } from '@angular/core';
declare const L: any;

@Component({
  selector: 'ngx-map-routing',
  templateUrl: './map-routing.component.html',
  styleUrls: ['./map-routing.component.scss']
})
export class MapRoutingComponent implements OnInit {

  constructor() { }

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
      const latLong = [41.85, -87.65];
      console.log(
        `lat: ${41.85}, lon: ${-87.65}`
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


      let marker = L.marker(latLong,{draggable:true}).addTo(mymap);

      marker.bindPopup('<b>Hi I am here</b>').openPopup();

      // let popup = L.popup()
      //   .setLatLng(latLong)
      //   .setContent('I am here')
      //   .openOn(mymap);

        marker.on('dragend', function(event) {
          var latlng = event.target.getLatLng();
          console.log(latlng.lat, latlng.lng)
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
