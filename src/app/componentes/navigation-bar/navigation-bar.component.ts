import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms'
import { CommonModule } from '@angular/common';
import { AuthService } from '../../servicios/auth.service';
import { Usuario } from '../../interfaz/usuario';

@Component({
  selector: 'app-navigation-bar',
  standalone:true,
  imports: [RouterLink, FormsModule,CommonModule],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {
  searchQuery: string = ''; // Bind this to the input field
  currentUser:Usuario | null = null ;
  constructor(private router: Router, public authService: AuthService) {
  this.loadCurrentUser();
  }

  private loadCurrentUser() {
    const userData = localStorage.getItem('user');
    this.currentUser = userData ? JSON.parse(userData) : null;
  }
  // Handle search form submission
  onSearch() {
    if (this.searchQuery) {
      // Navigate to the search route with the query as a query parameter
      this.router.navigate(['search'], { queryParams: { q: this.searchQuery } });
    }
  }
  logout() {
    this.authService.logout()
  }
}