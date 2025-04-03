// comentarios.service.ts
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams, HttpErrorResponse } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';


interface Comentario {
  id: number;
  descripcion: string;
  id_pelicula: number;
  usuario_id: number;
  createdAt: string;
  usuario: {
    id_usuario: number;
    nombre: string;
    nombre_usuario: string;
    avatar_url?: string;
  };
}

interface ComentariosResponse {
  success: boolean;
  data: Comentario[];
  meta?: {
    total: number;
    paginaActual: number;
    totalPaginas: number;
    porPagina: number;
  };
}
@Injectable({
  providedIn: 'root'
})
export class ComentariosService {
  // Asegúrate que no haya caracteres invisibles en la URL
  private apiUrl = 'http://localhost:3000/comentarios'; // Sin espacios ni caracteres especiales

  constructor(private http: HttpClient) {}

  getAllComentariosPorPelicula(peliculaId: number): Observable<ComentariosResponse> {
    // Verifica que la URL se construya correctamente
    const url = `${this.apiUrl}/${peliculaId}`;
   // console.log('URL de la solicitud:', url); // Para depuración
    
    return this.http.get<ComentariosResponse>(url).pipe(
      catchError((error: HttpErrorResponse) => {
        console.error('Error fetching comments:', error);
        return of({
          success: false,
          data: [],
          error: 'Failed to load comments'
        });
      })
    );
  }
  crearComentario(comentarioData: {
    descripcion: string;
    id_pelicula: number;
    id_usuario: number;
  }): Observable<any> {
    //console.log(this.http.post(`${this.apiUrl}`, comentarioData))
    return this.http.post(`${this.apiUrl}`, comentarioData);
  }
}