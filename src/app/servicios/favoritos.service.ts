import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FavoritosService {
  private apiUrl = ''; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) { }

  agregarFavorito(favorito: any): Observable<any> {
    return this.http.post(this.apiUrl, favorito);
  }

  eliminarFavorito(usuarioId: number, peliculaId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${usuarioId}/${peliculaId}`);
  }

  obtenerFavoritosPorUsuario(usuarioId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${usuarioId}`);
  }
}
