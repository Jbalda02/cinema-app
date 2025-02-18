import { bootstrapApplication } from '@angular/platform-browser';
import { provideHttpClient } from '@angular/common/http'; // For HttpClient
import { provideRouter } from '@angular/router'; // For Router
import { AppComponent } from './app/app.component';
import { routes } from './app/app.routes'; // Import your routes

bootstrapApplication(AppComponent, {
  providers: [
    provideHttpClient(),
    provideRouter(routes), 
  ],
}).catch((err) => console.error(err));