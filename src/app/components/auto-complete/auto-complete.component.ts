import { Observable, startWith, map } from 'rxjs';
import { FormControl, FormGroup } from '@angular/forms';
import { Component, OnDestroy, OnInit } from '@angular/core';
import { faCloudSunRain } from '@fortawesome/free-solid-svg-icons';
import { faTemperatureLow } from '@fortawesome/free-solid-svg-icons';
import { faTemperatureHigh } from '@fortawesome/free-solid-svg-icons';

import { LocationService } from '../../services/location.service';
import { HttpInterceptorService } from 'src/app/services/http-Interceptor.service';

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

  //Get Weather Form
  getWeatherForm!: FormGroup;

  constructor(
    private locationService: LocationService,
    private interceptor: HttpInterceptorService
  ) {}

  ngOnInit(): void {
    this.createGetWeatherForm();
    this.getCities();
    this.filterOptions();
  }

  private _filter(value: string): string[] {
    const filterValue = value;
    let filteredData: string[] = [];
    if (this.options) {
      filteredData = this.options.filter((option: any) =>
        option.city.toLowerCase().includes(filterValue)
      );
    }

    return filteredData;
  }

  createGetWeatherForm() {
    this.getWeatherForm = new FormGroup({
      cityNameInput: new FormControl(null),
    });
  }

  filterOptions(): void {
    this.filteredOptions = this.getWeatherForm.controls[
      'cityNameInput'
    ].valueChanges.pipe(
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
    this.clearApiResponseData();
    this.cityName = this.getWeatherForm.value.cityNameInput;
    this.locationService.getWeatherByCityName(this.cityName).subscribe({
      next: (v) => {
        (this.name = v.name), (this.temp = v.main.temp);
      },
    });
    this.getWeatherForm.reset();
  }

  clearApiResponseData() {
    this.name = null;
    this.temp = null;
  }

  ngOnDestroy(): void {}
}
