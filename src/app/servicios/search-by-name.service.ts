import { Injectable } from '@angular/core';
<<<<<<< HEAD
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Movie, Cast, Reviews } from './servicios/movie';
=======
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
>>>>>>> 48b8ad03655db0f0c97cfd0ec1f245c8132fa826

@Injectable({
  providedIn: 'root',
})
export class SearchByNameService {
<<<<<<< HEAD
  private apiKey = 'f68c6f51fce3babe5ba752b2f087c1d3';
=======
  private apiKey = 'f68c6f51fce3babe5ba752b2f087c1d3'; // Replace with your TMDB API key
>>>>>>> 48b8ad03655db0f0c97cfd0ec1f245c8132fa826
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

<<<<<<< HEAD
  private handleError(error: HttpErrorResponse) {
    if (error.error instanceof ErrorEvent) {
      console.error('An error occurred:', error.error.message);
    } else {
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`
      );
    }
    return throwError('Something bad happened; please try again later.');
  }

  getMovieDetails(movieId: number): Observable<Movie> {
    const url = `${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}`;
    return this.http.get<Movie>(url).pipe(catchError(this.handleError));
  }

  getMovieCast(movieId: number): Observable<Cast> {
    const url = `${this.baseUrl}/movie/${movieId}/credits?api_key=${this.apiKey}`;
    return this.http.get<Cast>(url).pipe(catchError(this.handleError));
  }

  getMovieReviews(movieId: number): Observable<Reviews> {
    const url = `${this.baseUrl}/movie/${movieId}/reviews?api_key=${this.apiKey}`;
    return this.http.get<Reviews>(url).pipe(catchError(this.handleError));
  }

  searchMovies(query: string): Observable<any> {
    const url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${query}`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  getMoviePopular(): Observable<any> {
    const url = `${this.baseUrl}/movie/popular?api_key=${this.apiKey}`;
    return this.http.get(url).pipe(catchError(this.handleError));
  }

  getAiringMovies(): Observable<any> {
    const url = `${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}`;
    return this.http.get(url).pipe(catchError(this.handleError));
=======
  // Method to search for movies by name
  searchMovies(query: string): Observable<any> {
    const url = `${this.baseUrl}/search/movie?api_key=${this.apiKey}&query=${query}`;
    return this.http.get(url);
  }

  // Method to get movie details by ID
  getMovieDetails(movieId: number): Observable<any> {
    const url = `${this.baseUrl}/movie/${movieId}?api_key=${this.apiKey}`;
    return this.http.get(url);
  }
  getMoviePopular():Observable<any>{
    const url = `${this.baseUrl}/movie/popular?api_key=${this.apiKey}`; // Remove the trailing slash
    return this.http.get(url);
  }
  getAiringMovies():Observable<any>{
    const url = `${this.baseUrl}/movie/now_playing?api_key=${this.apiKey}`; // Remove the trailing slash
    return this.http.get(url);
>>>>>>> 48b8ad03655db0f0c97cfd0ec1f245c8132fa826
  }
}