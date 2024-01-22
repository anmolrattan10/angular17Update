import { FormControl } from '@angular/forms';
import { Observable, startWith, map } from 'rxjs';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { faTemperatureLow } from '@fortawesome/free-solid-svg-icons';
import { faCloudSunRain } from '@fortawesome/free-solid-svg-icons';
import { faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';

import { LocationService } from '../../services/location.service';

@Component({
  selector: 'app-auto-complete',
  templateUrl: './auto-complete.component.html',
  styleUrls: ['./auto-complete.component.css'],
})
export class AutoCompleteComponent implements OnInit, OnDestroy {
  //Icons
  faTemperatureLow = faTemperatureLow;
  faCloudSunRain = faCloudSunRain;
  faTemperatureHigh = faTemperatureHigh;

  // Pre API Data
  options!: string[];
  cityName!: string | null;
  myControl = new FormControl('');
  filteredOptions!: Observable<any>;

  // API Response Data
  name!: string | null;
  temp!: number | null;
  errorMessage: string | null = null;

  // Clear Timeout ID
  timeoutID!: NodeJS.Timeout;

  constructor(private locationService: LocationService) {}

  ngOnInit(): void {
    this.getCities();

    this.timeoutID = setTimeout(() => {
      this.filterOptions();
    }, 100);
  }

  private _filter(value: string): string[] {
    const filterValue = value;

    return this.options.filter((option: any) =>
      option.city.toLowerCase().includes(filterValue)
    );
  }

  filterOptions(): void {
    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map((value) => this._filter(value || ''))
    );
  }

  getCities(): void {
    this.locationService.getCities().subscribe((data) => {
      this.options = data.data;
    });
  }

  getWeather(): void {
    this.errorMessage = null;
    this.name = null;
    this.temp = null;
    this.cityName = this.myControl.value;
    this.locationService.getWeatherByCityName(this.cityName).subscribe(
      (data) => {
        this.name = data.name;
        this.temp = data.main.temp;
      },
      (error: any) => {
        this.errorMessage = error.error.message;
      }
    );

    this.myControl.reset();
  }

  ngOnDestroy(): void {
    clearTimeout(this.timeoutID);
  }
}
