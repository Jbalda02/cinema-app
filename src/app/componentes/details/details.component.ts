import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SearchByNameService } from '../../servicios/search-by-name.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import { Movie, Actor, Review } from '../../servicios/servicios/movie';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  movie: Movie | undefined;
  cast: Actor[] = [];
  reviews: Review[] = [];
  comments: string[] = [];
  newComment: string = '';
  userEmail: string = ''; // Agrega esta propiedad
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchByNameService
  ) {}

  ngOnInit() {
    this.loading = true;
    this.route.params.subscribe((params) => {
      const movieId = +params['id'];
      this.searchService.getMovieDetails(movieId).pipe(
        catchError(error => {
          console.error('Error fetching movie details:', error);
          this.loading = false;
          return of(undefined);
        })
      ).subscribe((data) => {
        this.movie = data;
        this.loading = false;
      });

      this.searchService.getMovieCast(movieId).pipe(
        catchError(error => {
          console.error('Error fetching movie cast:', error);
          return of({ cast: [] });
        })
      ).subscribe((data) => {
        this.cast = data.cast;
      });

      this.searchService.getMovieReviews(movieId).pipe(
        catchError(error => {
          console.error('Error fetching movie reviews:', error);
          return of({ results: [] });
        })
      ).subscribe((data) => {
        this.reviews = data.results;
      });
    });
  }

  addComment() {
    if (this.newComment.trim()) {
      this.comments.push(this.newComment);
      this.newComment = '';
    }
  }
}