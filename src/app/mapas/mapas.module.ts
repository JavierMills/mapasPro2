import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapaScreenComponent } from './screens/mapa-screen/mapa-screen.component';
import { MapViewComponent } from './components/map-view/map-view.component';
import { LoadingComponent } from './components/loading/loading.component';
import { BotonLocationComponent } from './components/boton-location/boton-location.component';
import { LogoAngularComponent } from './components/logo-angular/logo-angular.component';
import { SearchBarComponent } from './components/search-bar/search-bar.component';
import { SearchResultsComponent } from './components/search-results/search-results.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [
    MapaScreenComponent,
    MapViewComponent,
    LoadingComponent,
    BotonLocationComponent,
    LogoAngularComponent,
    SearchBarComponent,
    SearchResultsComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule
  ],
  exports	:[
    MapaScreenComponent
  ]
})
export class MapasModule { }
