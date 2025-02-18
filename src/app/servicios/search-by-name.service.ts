import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SearchByNameService {
  private apiKey = 'f68c6f51fce3babe5ba752b2f087c1d3'; // Replace with your TMDB API key
  private baseUrl = 'https://api.themoviedb.org/3';

  constructor(private http: HttpClient) {}

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
  }
}