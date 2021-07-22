import { Component, OnInit } from '@angular/core';
declare const L: any;

@Component({
  selector: 'ngx-map-intenerary',
  templateUrl: './map-intenerary.component.html',
  styleUrls: ['./map-intenerary.component.scss']
})
export class MapInteneraryComponent implements OnInit {

  constructor() {
  }
  lat_Start:any
  long_Start:any
  lat_End:any
  long_End:any

  ngOnInit() {
    if (!navigator.geolocation) {
      console.log('location is not supported');
    }
      const Display_startTripeLat = localStorage.getItem("Display_startTripeLat");
      const Display_startTripeLng = localStorage.getItem("Display_startTripeLng");
      const Display_endTripeLat = localStorage.getItem("Display_endTripeLat");
      const Display_endTripeLng = localStorage.getItem("Display_endTripeLng");
       
      console.log(localStorage.getItem("Display_startTripeLat"))

      const latLong = [Display_startTripeLat, Display_startTripeLng];
      const latLongEnd = [Display_endTripeLat, Display_endTripeLng];
    
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

      let marker = L.marker(latLong,{draggable:false,icon: custom_icon}).addTo(mymap);
      let marker_end = L.marker(latLongEnd,{draggable:false,icon: custom_icon_end}).addTo(mymap);

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
          console.log(latlng.lat,localStorage.latlng.lng)
        });
        marker_end.on('dragend', function(event) {
          var latlng = event.target.getLatLng();
          console.log(latlng.lat,localStorage.latlng.lng)
        });
        
        var latlngs = Array();

        //Get latlng from first marker
        latlngs.push(marker.getLatLng());

        //Get latlng from first marker
        latlngs.push(marker_end.getLatLng());

        //You can just keep adding markers

        //From documentation http://leafletjs.com/reference.html#polyline
        // create a red polyline from an arrays of LatLng points
        var polyline = L.polyline(latlngs, {color: 'grey'}).addTo(mymap);

        mymap.fitBounds(polyline.getBounds());
    
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
