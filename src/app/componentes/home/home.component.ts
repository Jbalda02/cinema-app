import { Component, OnInit } from '@angular/core';
import { SearchByNameService } from '../../servicios/search-by-name.service';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-home',
  imports: [CommonModule, RouterLink],
  standalone:true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
})
export class HomeComponent {
  popularMovies: any = [];
  airingMovies:any =[];
  firstPopularMovies:any = [];
  constructor(private searchService :SearchByNameService){}

  ngOnInit() {
    this.searchService.getMoviePopular().subscribe((data: any) => {
      this.popularMovies = data.results; // Assign the results to popularMovies
      this.firstPopularMovies = this.popularMovies.splice(0,3);
  
    });

    this.searchService.getAiringMovies().subscribe((data: any) => {
      this.airingMovies = data.results; // Assign the results to popularMovies
    });
    
 
  }

}
