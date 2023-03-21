import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

var mapboxgl = require('mapbox-gl/dist/mapbox-gl.js');

mapboxgl.accessToken = 'pk.eyJ1IjoiamF2aWVybWlsbHMiLCJhIjoiY2xmYTF5M2M0MHIyODNyczBxODJ3YTJvNSJ9.Zo-z1RJJqU8ope3e0CqekQ';

if(!navigator.geolocation){
  alert('Navegador no soporta la geolocalizacion');
  throw new Error('Navegador no soporta la geolocalizacion');
}

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule)
  .catch(err => console.error(err));
