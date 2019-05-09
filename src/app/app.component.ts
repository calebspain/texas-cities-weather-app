import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  cities = {
    "Houston": {
      lat: 29.76328,
      lon: -95.36327
    },
    "El Paso": {
      lat: 31.772543,
      lon: -106.460953
    },
    "Dallas": {
      lat: 32.897480,
      lon: -97.040443
    },
    "Austin": {
      lat: 30.26715,
      lon: -97.74306
    },
    "San Antonio": {
      lat: 29.424349,
      lon: -98.491142
    }
  }

  city = '';
  lat = '';
  lon = '';
  temp = '';
  pressure = '';
  humidity = '';
  low = '';
  high = '';
  error = '';

  url = '';
  
  constructor(private http: HttpClient) { }

  setCoordinates() {
    this.lat = this.cities[this.city].lat;
    this.lon = this.cities[this.city].lon;
    this.url = `https://fcc-weather-api.glitch.me/api/current?lat=${this.lat}&lon=${this.lon}`;
  }

  updateWeatherInfo() {
    if (this.cities.hasOwnProperty(this.city)) {
      this.setCoordinates();
      this.error = '';
      this.http.get(this.url).subscribe(
        (data:any) => {
          this.temp = String((data.main.temp * 1.8 + 32).toFixed(2));
          this.pressure = data.main.pressure;
          this.humidity = data.main.humidity;
          this.low = String((data.main.temp_min * 1.8 + 32).toFixed(2));
          this.high = String((data.main.temp_max * 1.8 + 32).toFixed(2));
        }
      )
    } else {
      this.http.get(this.url).subscribe(
        (data:any) => {
          this.temp = '';
          this.pressure = '';
          this.humidity = '';
          this.low = '';
          this.high = '';
          this.error ='Error: city not found.';
        }
      )
    }
  }

}
