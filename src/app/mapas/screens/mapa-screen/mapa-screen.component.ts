import { Component, OnInit } from '@angular/core';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-mapa-screen',
  templateUrl: './mapa-screen.component.html',
  styleUrls: ['./mapa-screen.component.css']
})
export class MapaScreenComponent {

  constructor( private placesServeice: PlacesService) { 
    
  }

  get localizacionUsuarioLista(){
    return this.placesServeice.usuarioLocalizado;
  }

 

}
