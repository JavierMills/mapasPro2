import { Component } from '@angular/core';
import { MapService, PlacesService } from '../../services';

@Component({
  selector: 'app-boton-location',
  templateUrl: './boton-location.component.html',
  styleUrls: ['./boton-location.component.css']
})
export class BotonLocationComponent {

  constructor(private mapService: MapService, private placesServices:PlacesService) { }

  goToMyLocation(){


    if(!this.placesServices.usuarioLocalizado) throw Error('no hay ubicación de usuario');
    if(!this.mapService.isMapReady) throw Error('no hay mapa de usuario listo');

    this.mapService.flyTo(this.placesServices.localizacionUsuario!);

  }



}
