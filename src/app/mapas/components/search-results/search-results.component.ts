import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services';
import { Feature } from '../../interfaces/places';
import { MapService } from '../../services/map.service';

@Component({
  selector: 'app-search-results',
  templateUrl: './search-results.component.html',
  styleUrls: ['./search-results.component.css']
})
export class SearchResultsComponent  {

  public placesId : string = "";

  constructor(private placesService: PlacesService, private mapService:MapService) { }

  get isLoadingPlaces(): boolean{
    return this.placesService.isLoadingPlaces;
  }

  get places() : Feature[]{
    return this.placesService.places;
  }
  
  flyTo(  place: Feature ){

    this.placesId = place.id;

    const [ lng, lat ] = place.center;

    this.mapService.flyTo([lng, lat ]);

  }

  obtenerDirecciones(places: Feature){

    if(!this.placesService.localizacionUsuario) throw Error ('Error en localizar al usuario')

    this.placesService.eliminarPlaces();

    const end = places.center as [number , number];
    const start = this.placesService.localizacionUsuario;

    this.mapService.obtenerRutaPuntos(start , end);

  }

}
