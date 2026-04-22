import { Injectable } from '@angular/core';
import { Observable, Observer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  public getPosition(): Observable<GeolocationPosition> {
    return new Observable((observer: Observer<GeolocationPosition>) => {
      // Check if the browser supports geolocation
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position: GeolocationPosition) => {
            observer.next(position);
            observer.complete();
          },
          (error: GeolocationPositionError) => {
            observer.error(error);
          },
          // Optional options object for high accuracy, timeout, etc.
          {
            enableHighAccuracy: true,
            timeout: 27000,
            maximumAge: 30000
          }
        );
      } else {
        observer.error('Geolocation is not supported by this browser.');
      }
    });
  }
}
