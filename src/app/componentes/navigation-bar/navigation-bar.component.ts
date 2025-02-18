import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';
import { Router } from '@angular/router';
import {FormsModule} from '@angular/forms'
@Component({
  selector: 'app-navigation-bar',
  imports: [RouterLink, FormsModule],
  templateUrl: './navigation-bar.component.html',
  styleUrl: './navigation-bar.component.css'
})
export class NavigationBarComponent {
  searchQuery: string = ''; // Bind this to the input field

  constructor(private router: Router) {}

  // Handle search form submission
  onSearch() {
    if (this.searchQuery) {
      // Navigate to the search route with the query as a query parameter
      this.router.navigate(['search'], { queryParams: { q: this.searchQuery } });
    }
  }
}