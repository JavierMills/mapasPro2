import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapaScreenComponent } from './mapa-screen.component';

describe('MapaScreenComponent', () => {
  let component: MapaScreenComponent;
  let fixture: ComponentFixture<MapaScreenComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapaScreenComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapaScreenComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
