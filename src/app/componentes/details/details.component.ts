import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { SearchByNameService } from '../../servicios/search-by-name.service';
import { CommonModule, CurrencyPipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { catchError } from 'rxjs/operators';
import { of } from 'rxjs';
import {
  Movie,
  Actor,
  Review,
  ComentariosResponse,
  Comentario,
} from '../../servicios/servicios/movie';
import { ComentariosService } from '../../servicios/get-comments.service';
import { Usuario } from '../../interfaz/usuario';
import { AuthService } from '../../servicios/auth.service';
import { ReseñasService } from '../../servicios/reseñas.service';
import { FavoritosService } from '../../servicios/favoritos.service';

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe, RouterModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  movie: Movie | undefined;
  cast: Actor[] = [];
  reviews: Review[] = [];
  comments: Comentario[] = [];
  newComment: string = '';
  userEmail: string = '';
  loading = false;
  currentUser: Usuario | null = null;
  isLoggedIn = false;
  movieId = 0;
  nuevoComentario: any = {
    id_pelicula: 0,
    usuario_id: 0,
    descripcion: '',
  };
  nuevaResena: any = {
    peliculaId: 0,
    usuarioId: 0,
    contenido: '',
    calificacion: 0,
  };

  constructor(
    private route: ActivatedRoute,
    private searchService: SearchByNameService,
    private commentService: ComentariosService,
    private authService: AuthService,
    private resenasService: ReseñasService,
    private favoritosService: FavoritosService
  ) {
    this.loadCurrentUser();
  }

  private loadCurrentUser() {
    const userData = localStorage.getItem('user');
    this.currentUser = userData ? JSON.parse(userData) : null;
    this.nuevoComentario.usuario_id = this.currentUser?.id;
  }

  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthenticated();

    this.loading = true;
    this.route.params.subscribe((params) => {
      this.movieId = +params['id'];
      this.nuevoComentario.id_pelicula = this.movieId;
      this.nuevaResena.peliculaId = this.movieId;

      this.searchService
        .getMovieDetails(this.movieId)
        .pipe(
          catchError((error) => {
            console.error('Error fetching movie details:', error);
            this.loading = false;
            return of(undefined);
          })
        )
        .subscribe((data) => {
          this.movie = data;
          this.loading = false;
        });

      this.searchService
        .getMovieCast(this.movieId)
        .pipe(
          catchError((error) => {
            console.error('Error fetching movie cast:', error);
            return of({ cast: [] });
          })
        )
        .subscribe((data) => {
          this.cast = data.cast;
        });

      this.resenasService.obtenerReseñasPorPelicula(this.movieId).subscribe({
        next: (reseñas) => {
          this.reviews = reseñas;
        },
        error: (err) => {
          console.error('Error fetching reseñas from backend:', err);
        },
      });

      this.commentService.getAllComentariosPorPelicula(this.movieId).subscribe({
        next: (response) => {
          if (response.success) {
            this.comments = response.data;
          }
        },
        error: (err) => {
          console.error('Error en la solicitud:', err);
        },
      });
    });
  }

  loadComments(movieId: number) {
    this.loading = true;
    this.commentService.getAllComentariosPorPelicula(movieId).subscribe({
      next: (response) => {
        this.comments = response.data;
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        console.error('Error cargando comentarios:', err);
      },
    });
  }

  addComment() {
    if (!this.nuevoComentario.descripcion.trim()) {
      return;
    }

    this.commentService.crearComentario(this.nuevoComentario).subscribe({
      next: (response) => {
        if (response.success) {
          this.nuevoComentario.descripcion = '';
          this.loadComments(this.movieId);
        }
      },
      error: (err) => {
        console.error('Error al agregar comentario:', err);
      },
    });
  }

  addResena() {
    this.nuevaResena.peliculaId = this.movieId;
    this.nuevaResena.usuarioId = this.currentUser?.id;

    this.resenasService.crearReseña(this.nuevaResena).subscribe({
      next: (response) => {
        this.obtenerResenas();
        this.nuevaResena.contenido = '';
        this.nuevaResena.calificacion = 0;
      },
      error: (err) => {
        console.error('Error adding reseña:', err);
      },
    });
  }

  obtenerResenas() {
    this.resenasService.obtenerReseñasPorPelicula(this.movieId).subscribe({
      next: (reseñas) => {
        this.reviews = reseñas;
      },
      error: (err) => {
        console.error('Error obteniendo reseñas:', err);
      },
    });
  }

  agregarFavorito() {
    const favorito = {
      usuarioId: this.currentUser?.id,
      peliculaId: this.movieId,
    };

    this.favoritosService.agregarFavorito(favorito).subscribe({
      next: (response) => {
        // Lógica después de agregar a favoritos
      },
      error: (err) => {
        console.error('Error adding to favorites:', err);
      },
    });
  }

  eliminarFavorito() {
    const userId = this.currentUser?.id ?? 0; // Default to 0 if undefined
    const movieId = this.movieId ?? 0; // Default to 0 if undefined
  
    this.favoritosService.eliminarFavorito(userId, movieId).subscribe({
      next: (response) => {
        // Lógica después de eliminar de favoritos
      },
      error: (err) => {
        console.error('Error removing from favorites:', err);
      },
    });
  }
}