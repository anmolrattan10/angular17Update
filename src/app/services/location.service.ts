import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class LocationService {
  latitude!: number;
  longitude!: number;

  constructor(private http: HttpClient) {}

  getPosition(): Promise<any> {
    return new Promise((resolve, reject) => {
      navigator.geolocation.getCurrentPosition(
        (resp) => {
          resolve({ lng: resp.coords.longitude, lat: resp.coords.latitude });
        },
        (err) => {
          reject(err);
        }
      );
    });
  }

  getLocation(): void {
    this.getPosition().then((pos: { lng: number; lat: number }) => {
      // console.log(`Positon: ${pos.lng} ${pos.lat}`);
      this.latitude = +pos.lat.toFixed(2);
      this.longitude = +pos.lng.toFixed(2);
    });
  }

  getWeather(): Observable<any> {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?lat=${this.latitude}&lon=${this.longitude}&APPID=48dcd537c1fab1b82b12e3787b43edb3&units=metric`
    );
  }

  getWeatherByCityName(cityName: string | null): Observable<any> {
    return this.http.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&APPID=48dcd537c1fab1b82b12e3787b43edb3&units=metric`
    );
  }

  getCities(): Observable<any> {
    return this.http.get(
      `https://countriesnow.space/api/v0.1/countries/population/cities`
    );
  }
}
