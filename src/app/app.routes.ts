import { Routes } from '@angular/router';
import { SearchComponent } from './componentes/search/search.component';
import { HomeComponent } from './componentes/home/home.component';
import { DetailsComponent } from './componentes/details/details.component';

export const routes: Routes = [
<<<<<<< HEAD
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'search', component: SearchComponent },
    { path: 'details/:id', component: DetailsComponent }, // Asegúrate de que esté aquí
    { path: 'home', component: HomeComponent },
    { path: '**', redirectTo: '' }
=======
  { path: 'search', component: SearchComponent },
  { path: 'details', component: DetailsComponent },
  { path: 'home', component: HomeComponent }, // Render HomeComponent for empty path
  { path: '**', redirectTo: 'home' } // Redirect any unknown paths to the home route
>>>>>>> 48b8ad03655db0f0c97cfd0ec1f245c8132fa826
];