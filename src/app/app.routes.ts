import { Routes } from '@angular/router';
import { SearchComponent } from './componentes/search/search.component';
import { HomeComponent } from './componentes/home/home.component';
import { DetailsComponent } from './componentes/details/details.component';

export const routes: Routes = [
  { path: 'search', component: SearchComponent },
  { path: 'details/:id', component: DetailsComponent },
  { path: 'home', component: HomeComponent }, 
  { path: '**', redirectTo: 'home' } // Redirect any unknown paths to the home route
];