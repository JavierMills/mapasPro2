import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { PlacesService } from '../../services/places.service';
import {Map, Marker, Popup} from 'mapbox-gl';
import { MapService } from '../../services';
7

@Component({
  selector: 'app-map-view',
  templateUrl: './map-view.component.html',
  styleUrls: ['./map-view.component.css']
})
export class MapViewComponent implements AfterViewInit {

  @ViewChild('mapDiv') mapDivElement!: ElementRef;

  constructor(private placesServices: PlacesService,
    private mapServices: MapService) { }


  ngAfterViewInit(): void {
    if(!this.placesServices.localizacionUsuario ) throw Error('No hay error en places services');

    var map = new Map({
      container: this.mapDivElement.nativeElement,
      style: 'mapbox://styles/mapbox/streets-v9',
      center: this.placesServices.localizacionUsuario,
      zoom: 18
    });


    const popup = new Popup().setHTML(
      `
      <h6>Aqui estoy</h6>
      <span>Estoy en este lugar del mundo</span>
      `
    );

    new Marker({color: 'red'}).setLngLat(this.placesServices.localizacionUsuario)
    .setPopup(popup)
    .addTo(map);


      
    this.mapServices.setMap(map);
  }


}
