import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { PlacesService } from '../../services';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.css'],
})
export class SearchBarComponent {

  private debounceTimer?:NodeJS.Timeout;

  searchForm: FormGroup = this.fb.group({
    search: ['',[ Validators.required]]
  })

  constructor(private fb: FormBuilder, private placesService: PlacesService) {
  
  }

  onQueryChanged(value: string = ''){

    if(this.debounceTimer) clearTimeout(this.debounceTimer)
    
    this.debounceTimer = setTimeout(() => {
        this.placesService.getPlacesByQuery(value);
    }, 500);

  }




}
