import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  private apiUrl = 'http://localhost:3000';

  constructor(private http: HttpClient) {}

  agregarAFavoritos(userId: string, peliculaId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/peliculas/favoritos`, { userId, peliculaId });
  }

  getFavoritos(userId: string): Observable<any> {
    return this.http.get(`${this.apiUrl}/usuario/${userId}/perfil`);
  }
}
