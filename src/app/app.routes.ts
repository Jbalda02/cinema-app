import { Routes } from '@angular/router';
import { SearchComponent } from './componentes/search/search.component';
import { HomeComponent } from './componentes/home/home.component';
import { DetailsComponent } from './componentes/details/details.component';
import { LoginComponent } from './componentes/login/login.component';
import { authGuard } from './guard/auth.guard';
import { RegisterComponent } from './componentes/register/register.component';

export const routes: Routes = [
    { path: '', component: HomeComponent, pathMatch: 'full' },
    { path: 'search', component: SearchComponent },
    { path: 'details/:id', component: DetailsComponent }, // Asegúrate de que esté aquí
    { path: 'home', component: HomeComponent },
    { path: 'login', component: LoginComponent }, // Ruta del Login
    { path: 'register', component:RegisterComponent},
    { path: '**', redirectTo: '' },

];