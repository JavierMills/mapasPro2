import { Injectable } from '@angular/core';
import { AnySourceData, LngLatBounds, LngLatLike, Map, Marker, Popup } from 'mapbox-gl';
import { DirectionsApi } from '../api/directionsApi';
import { Directions, Route } from '../interfaces/directions';
import { Feature } from '../interfaces/places';

@Injectable({
  providedIn: 'root',
})
export class MapService {
  private map?: Map;

  private markers : Marker [] = [];

  // validamos que el mapa este listo, si no esta listo retorna fslse
  get isMapReady() {
    return !!this.map;
  }

  setMap(map: Map) {
    this.map = map;
  }

  flyTo(cords: LngLatLike) {
    if (!this.isMapReady) throw Error('El mapa no esta inicializado');

    this.map?.flyTo({
      zoom: 17,
      center: cords,
    });
  }

  constructor(private direcionsApi : DirectionsApi) {}

  crearMarkerLugares( places:Feature[], userLocation : [number , number]){
    if(!this.map) throw Error ('Mapa no inicializado...')

    this.markers.forEach( marker => marker.remove());

    const newMarkers = [];

    for (const place of places) {
      const [lng, lat] = place.center;
      const popup = new Popup().setHTML(`
      <h6>${place.text }</h6>
      <span>${ place.place_name}</span>
      `);

      const newMarker = new Marker()
      .setLngLat( [lng, lat] )
      .setPopup( popup )
      .addTo(this.map);

      newMarkers.push( newMarker );

      
    }
    this.markers = newMarkers;

    if(places.length === 0) return;


    // // limitar el map 
    const bounds = new LngLatBounds();
    newMarkers.forEach( marker => bounds.extend(marker.getLngLat()));
    bounds.extend( userLocation );

    this.map.fitBounds(bounds,{
      padding: 100
    });
  }

  obtenerRutaPuntos(start: [number,number], end:[number, number]){

    this.direcionsApi.get<Directions>(`/${start.join(',')}; ${end.join(',')}`)
    .subscribe( resp => {
      this.drawPolylane( resp.routes[0]);
    })

  }

  private drawPolylane( route : Route){
    console.log({distance: route.distance / 100, duration: route.duration / 60 });

    if(!this.map) throw Error('Mapa no inicializado')

    const coords = route.geometry.coordinates;
    

    const bounds = new LngLatBounds();

    coords.forEach(([ lng, lat ]) => {
      bounds.extend([lng, lat ])
    })

    this.map.fitBounds(bounds, {
      padding: 100
    })


    //poly line

    const sourceData : AnySourceData = {
      type: 'geojson',
      data:{
        type: 'FeatureCollection',
        features:[
          {
            type:'Feature',
            properties:{},
            geometry:{
              type: 'LineString',
              coordinates: coords
            }
          }
        ]
      }
    }

    // limpiar la ruta
    if(this.map.getLayer('RouteString')){
       this.map.removeLayer('RouteString');
       this.map.removeSource('RouteString');
    }

    this.map.addSource('RouteString', sourceData);

    this.map.addLayer({
      //id del layer
      id: 'RouteString',
      type: 'line',
      // is del source
      source: 'RouteString',
      layout:{
        'line-cap': 'round',
        'line-join' :'round'
      },
      paint:{
        'line-color': 'black',
        'line-width':2
      }
    })

  }
}
