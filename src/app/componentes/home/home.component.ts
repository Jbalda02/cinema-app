import { Component, OnInit } from '@angular/core';
import { SearchByNameService } from '../../servicios/search-by-name.service';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { RouterModule } from '@angular/router'; // Importa RouterModule

@Component({
    selector: 'app-home',
    imports: [CommonModule, RouterModule], // Agrega RouterModule a imports
    standalone: true,
    templateUrl: './home.component.html',
    styleUrl: './home.component.css'
=======

@Component({
  selector: 'app-home',
  imports: [CommonModule],
  standalone:true,
  templateUrl: './home.component.html',
  styleUrl: './home.component.css'
>>>>>>> 48b8ad03655db0f0c97cfd0ec1f245c8132fa826
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
