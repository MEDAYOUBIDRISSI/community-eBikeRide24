import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MapInteneraryComponent } from './map-intenerary.component';

describe('MapInteneraryComponent', () => {
  let component: MapInteneraryComponent;
  let fixture: ComponentFixture<MapInteneraryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MapInteneraryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MapInteneraryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
