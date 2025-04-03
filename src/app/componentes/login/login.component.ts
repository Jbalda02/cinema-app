// src/app/features/auth/login/login.component.ts
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { AuthService } from '../../servicios/auth.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './login.component.html',
})
export class LoginComponent {
  private authService = inject(AuthService);
  private router = inject(Router);

  credentials = { correo_electronico: '', contrasena: '' };
  errorMessage = '';
  isLoading = false;

  onSubmit() {
    this.errorMessage = '';
    this.isLoading = true;

    this.authService.login(this.credentials).subscribe({
      next: (response: any) => {
        this.isLoading = false;
        // Guardar token y datos de usuario
        if (response.token && response.usuario) {
          localStorage.setItem('token', response.token);
          localStorage.setItem('user', JSON.stringify(response.usuario));
          this.router.navigate(['/home']); // Redirigir a página principal
        }
      },
      error: (err) => {
        this.isLoading = false;
      // El mensaje de error ahora vendrá correctamente formateado
      this.errorMessage = err.message;
      
      // Opcional: manejo específico por código de estado
      if (err instanceof HttpErrorResponse) {
        if (err.status === 0) {
          this.errorMessage = 'Error de conexión con el servidor';
        }
      }
    }
  });
  }
}