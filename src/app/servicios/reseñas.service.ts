import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReseñasService {
  private apiUrl = 'http://localhost:3000/reseñas'; // Reemplaza con la URL de tu API

  constructor(private http: HttpClient) { }

  obtenerReseñasPorPelicula(peliculaId: number): Observable<any[]> {
    return this.http.get<any[]>(`${this.apiUrl}/${peliculaId}`);
  }

  crearReseña(reseña: any): Observable<any> {
    return this.http.post(this.apiUrl, reseña);
  }

  actualizarReseña(reseñaId: number, reseña: any): Observable<any> {
    return this.http.put(`${this.apiUrl}/${reseñaId}`, reseña);
  }

  eliminarReseña(reseñaId: number): Observable<any> {
    return this.http.delete(`${this.apiUrl}/${reseñaId}`);
  }

}