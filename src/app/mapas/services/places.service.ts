import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Feature, PlacesResponse } from '../interfaces/places';
import { PlacesApiClient } from '../api/placesApiClient';
import { MapService } from './map.service';


@Injectable({
  providedIn: 'root'
})
export class PlacesService {


  public localizacionUsuario : [number, number] | undefined;

  public isLoadingPlaces: boolean = false;
  public places: Feature [] = [];
 


  get usuarioLocalizado() :boolean{
    return !!this.localizacionUsuario;
  }

  constructor(private placesApi: PlacesApiClient, private mapService:MapService) { 
    this.getLocalizacionUsuario();
  }
  

  public async getLocalizacionUsuario(): Promise<[number, number]>{
    
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        ({coords}) =>{
          this.localizacionUsuario = [ coords.longitude, coords.latitude];
          resolve( this.localizacionUsuario);
        },
        (err) => {
          alert('No se pudo abtener la geolocalizacion')
          console.log(err);
          reject();
        }
      )
    })

  }

  getPlacesByQuery( query: string = ""){

    if(query.length === 0 ){
      this.places = [];
      this.isLoadingPlaces = false;
      return;
    }

    if(!this.localizacionUsuario) throw Error('No hay usuario')

    //validat cuando el string sea vacio

    this.isLoadingPlaces = true;

    return this.placesApi.get<PlacesResponse>(`/${query}.json`, {
      params:{
        proximity: this.localizacionUsuario.join(',')
      }
    })
    .subscribe(resp => {
    this.isLoadingPlaces = false;
      this.places = resp.features;

      this.mapService.crearMarkerLugares(this.places, this.localizacionUsuario!);
    })
  }


  eliminarPlaces(){
    this.places = []
  }
}
