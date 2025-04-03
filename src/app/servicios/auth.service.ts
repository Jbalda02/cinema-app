import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpErrorResponse,HttpHeaders } from '@angular/common/http';
import { Router } from '@angular/router';
import { Observable, catchError, throwError } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private http = inject(HttpClient);
  private router = inject(Router);
  private baseUrl = 'http://localhost:3000/api';
// Método para registrar usuario
register(userData: {
  nombre: string;
  nombre_usuario: string;
  correo_electronico: string;
  contrasena: string;
  apellido?: string;
  edad?: number | null;
}): Observable<any> {
  const headers = new HttpHeaders({
    'Content-Type': 'application/json; charset=utf-8'
  });

  return this.http.post(`${this.baseUrl}/usuarios/registro`, userData, { headers })
    .pipe(
      catchError(this.handleError)
    );
}
  login(credentials: { correo_electronico: string; contrasena: string }): Observable<any> {
    return this.http.post(`${this.baseUrl}/usuarios/login`, credentials, {
      headers: { 'Content-Type': 'application/json' },
      withCredentials: true
    }).pipe(
      catchError(this.handleError)
    );
  }
  private handleError(error: HttpErrorResponse) {
    let errorMessage = 'Error desconocido';
    
    if (error.error instanceof ErrorEvent) {
      // Error del lado del cliente
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // Error del lado del servidor
      if (error.error?.errors?.length > 0) {
        // Extraer el primer mensaje de validación
        errorMessage = error.error.errors[0].msg;
      } else if (error.error?.error) {
        // Usar el mensaje de error general si existe
        errorMessage = error.error.error;
      } else {
        // Mensaje por defecto
        errorMessage = error.statusText || 'Error en la solicitud';
      }
    }
    console.log(errorMessage)
    return throwError(() => new Error(errorMessage));
  }

  // Cerrar sesión
  logout(): void {
    console.log(localStorage.getItem('user'))
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.router.navigate(['/login']);
  }

  // Verificar autenticación
  isAuthenticated(): boolean {
    return !!localStorage.getItem('token');
  }

  // Obtener token
  getToken(): string | null {
    return localStorage.getItem('token');
  }

  // Guardar datos de sesión
  private setSession(authData: any): void {
    localStorage.setItem('token', authData.token);
    localStorage.setItem('user', JSON.stringify(authData.user));
  }

  // Obtener usuario actual
  getCurrentUser(): any {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  }
}