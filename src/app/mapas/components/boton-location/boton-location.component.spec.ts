import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BotonLocationComponent } from './boton-location.component';

describe('BotonLocationComponent', () => {
  let component: BotonLocationComponent;
  let fixture: ComponentFixture<BotonLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BotonLocationComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BotonLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
