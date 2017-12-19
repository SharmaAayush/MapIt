import { Component } from '@angular/core';
import { MarkerService } from './services/marker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  providers: [MarkerService]
})
export class AppComponent {
  // Zoom level
  zoom: number = 10;
  // Start Position
  lat: number = 28.6827705;
  lng: number = 77.2653955;
  // Values
  markerName:string;
  markerLat:string;
  markerLng:string;
  markerDraggable:string;
  newMarkerName:string;
  // Markers
  markers: marker[] = [];

  constructor(private _markerService: MarkerService){
    this.markers = this._markerService.getMarkers();
  }

  clickedMarker(marker:marker, index:number){
  }

  mapClicked($event:any){
    var newMarker = {
      name: 'Untitled',
      lat: $event.coords.lat,
      lng: $event.coords.lng,
      draggable: false
    }

    this.markers.push(newMarker);
  }

  markerDragEnd(marker:any, $event:any){

    var updMarker = {
      name: marker.name,
      lat: parseFloat(marker.lat),
      lng: parseFloat(marker.lng),
      draggable: false
    }

    var newLat = $event.coords.lat;
    var newLng = $event.coords.lng;

    this._markerService.updateMarker(updMarker, newLat, newLng);
  }

  addMarker(){
    if(this.markerDraggable == 'yes'){
      var isDraggable = true;
    } else {
      var isDraggable = false;
    }

    var newMarker = {
      name: this.markerName,
      lat: parseFloat(this.markerLat),
      lng: parseFloat(this.markerLng),
      draggable: isDraggable
    }

    this.markers.push(newMarker);
    this._markerService.addMarker(newMarker);
  }

  removeMarker(marker){
    for(var i = 0; i < this.markers.length; i++){
      if(marker.lat == this.markers[i].lat && marker.lng == this.markers[i].lng){
        this.markers.splice(i,1);
      }
    }

    this._markerService.removeMarker(marker);
  }

  changeName(newMarkerName, marker){
    for(var i = 0; i < this.markers.length; i++){
      if(marker.lat == this.markers[i].lat && marker.lng == this.markers[i].lng){
        this.markers[i].name = newMarkerName;
      }
    }

    this._markerService.changeName(newMarkerName, marker);
  }
}

// Marker
interface marker{
  name?: string;
  lat: number;
  lng: number;
  draggable: boolean;
}