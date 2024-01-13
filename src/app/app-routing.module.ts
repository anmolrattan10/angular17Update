import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AutoCompleteComponent } from './auto-complete/auto-complete.component';
import { WeatherComponent } from './weather/weather.component';
import { ToDoComponent } from './to-do/to-do.component';

const routes: Routes = [
  { path: '', redirectTo: 'Home', pathMatch: 'full' },
  { path: 'Home', component: WeatherComponent },
  { path: 'AutoComplete', component: AutoCompleteComponent },
  { path: 'ToDo', component: ToDoComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
