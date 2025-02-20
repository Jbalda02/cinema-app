import { CommonModule } from '@angular/common';
import { SearchByNameService } from '../../servicios/search-by-name.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { RouterModule } from '@angular/router'; // Importa RouterModule

@Component({
    selector: 'app-search',
    templateUrl: './search.component.html',
    imports: [CommonModule, RouterModule], // Agrega RouterModule a imports
    standalone: true
})
export class SearchComponent implements OnInit {
  query: string = '';
  results: any[] = [];

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchByNameService
  ) {}

  ngOnInit() {
    // Read the query parameter from the URL
    this.route.queryParams.subscribe((params) => {
      this.query = params['q']; // Get the query parameter
      if (this.query) {
        this.searchService.searchMovies(this.query).subscribe((data: any) => {
          this.results = data.results; // Update search results
          console.log(this.results)
        });
      }
    });
  }
}
