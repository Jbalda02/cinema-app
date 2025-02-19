import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchByNameService } from '../../servicios/search-by-name.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-details',
  imports: [CommonModule],
  standalone:true,
  templateUrl:"./details.component.html" ,
})
export class DetailsComponent implements OnInit {
  movie: any;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchByNameService
  ) {}

  ngOnInit() {
    const movieId = this.route.snapshot.paramMap.get('id'); // Get the movie ID from the route
    if (movieId) {
      this.searchService.getMovieDetails(+movieId).subscribe((data: any) => {
        this.movie = data; 
        console.log(this.movie)
      });
    }
  }
// In your component
formatRuntime(runtime: number | undefined | null): string {
  if (!runtime || isNaN(runtime)) {
    return 'N/A'; // Return "N/A" if runtime is invalid
  }
  if (runtime < 60) {
    return `${runtime}m`; // Display only minutes if runtime is less than 60 minutes
  }
  const hours = Math.floor(runtime / 60); // Get the number of hours
  const minutes = runtime % 60; // Get the remaining minutes
  return `${hours}h ${minutes}m`; // Format as "2h 30m"
}
formatRevenue(revenue: number | undefined | null): string {
  if (!revenue || isNaN(revenue)) {
    return 'No Info'; // Return "N/A" if revenue is invalid
  }

  // Abbreviated format (e.g., 4.21M, 1.23B)
  if (revenue >= 1_000_000_000) {
    return `${(revenue / 1_000_000_000).toFixed(2)}B`; // Billions
  } else if (revenue >= 1_000_000) {
    return `${(revenue / 1_000_000).toFixed(2)}M`; // Millions
  } else if (revenue >= 1_000) {
    return `${(revenue / 1_000).toFixed(2)}K`; // Thousands
  } else {
    return revenue.toLocaleString(); // Less than 1,000
  }
}
}
