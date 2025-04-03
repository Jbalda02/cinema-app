import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReseñasService {
  private apiUrl = 'http://localhost:3000/peliculas'; // URL del backend

  constructor(private http: HttpClient) {}

  getReseñas(peliculaId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/${peliculaId}/reseñas`);
  }
}
