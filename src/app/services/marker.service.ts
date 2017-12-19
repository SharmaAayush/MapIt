import { Injectable } from '@angular/core';

@Injectable()
export class MarkerService{
    load(){
        if(localStorage.getItem('markers') === null || localStorage.getItem('markers') === undefined){

            var markers = [
                {
                  name: 'Northern India Engineering College',
                  lat : 28.6827705,
                  lng: 77.2653955,
                  draggable: true
                },
                {
                  name: 'Maharana Pratap Inter State Bus Terminus',
                  lat : 28.6686580,
                  lng: 77.2300970,
                  draggable: true
                },
                {
                  name: 'Shahdara, Delhi, India',
                  lat : 28.6987570,
                  lng: 77.2925770,
                  draggable: true
                }
            ];

            localStorage.setItem('markers', JSON.stringify(markers));
        } else {
        }
    }
    
    constructor(){
        this.load();
    }

    getMarkers(){
        var markers = JSON.parse(localStorage.getItem('markers'));
        return markers;
    }

    addMarker(newMarker){
        // Fetch markers
        var markers = JSON.parse(localStorage.getItem('markers'));
        // Push to array
        markers.push(newMarker);
        // Set localStorage markers again
        localStorage.setItem('markers', JSON.stringify(markers));
    }

    updateMarker(marker, newLat, newLng){
        // Fetch markers
        var markers = JSON.parse(localStorage.getItem('markers'));

        for(var i = 0;i < markers.length;i++){
            if(marker.lat == markers[i].lat && marker.lng == markers[i].lng){
                markers[i].lat = newLat;
                markers[i].lng = newLng;
                break;
            }
        }

        
        // Set localStorage markers again
        localStorage.setItem('markers', JSON.stringify(markers));
    }

    removeMarker(marker){
        // Fetch markers
        var markers = JSON.parse(localStorage.getItem('markers'));

        for(var i = 0;i < markers.length;i++){
            if(marker.lat == markers[i].lat && marker.lng == markers[i].lng){
                markers.splice(i,1);
                break;
            }
        }

        
        // Set localStorage markers again
        localStorage.setItem('markers', JSON.stringify(markers));
    }
}