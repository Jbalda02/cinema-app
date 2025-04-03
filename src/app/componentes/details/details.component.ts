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

@Component({
  selector: 'app-details',
  standalone: true,
  imports: [CommonModule, FormsModule, CurrencyPipe,RouterModule],
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit {
  movie: Movie | undefined;
  cast: Actor[] = [];
  reviews: Review[] = [];
  comments: Comentario[] = [];
  newComment: string = '';
  userEmail: string = ''; // Agrega esta propiedad
  loading = false;
  currentUser:Usuario | null = null;
  isLoggedIn = false
  movieId = 0
  nuevoComentario: any = {
    id_pelicula:0,
    usuario_id:0,
    descripcion:''
  }
  constructor(
    private route: ActivatedRoute,
    private searchService: SearchByNameService,
    private commentService: ComentariosService,
    private authService:AuthService
  ) {this.loadCurrentUser()}

  private loadCurrentUser() {
    const userData = localStorage.getItem('user');
    this.currentUser = userData ? JSON.parse(userData) : null;
   // console.log(this.currentUser)
    this.nuevoComentario.usuario_id = this.currentUser?.id
  }
  ngOnInit() {
    this.isLoggedIn = this.authService.isAuthenticated();

    this.loading = true;
    this.route.params.subscribe((params) => {
      this.movieId = +params['id'];
      this.nuevoComentario.id_pelicula = this.movieId; 
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

      this.searchService
        .getMovieReviews(this.movieId)
        .pipe(
          catchError((error) => {
            console.error('Error fetching movie reviews:', error);
            return of({ results: [] });
          })
        )
        .subscribe((data) => {
          this.reviews = data.results;
        });

      // En el método ngOnInit
      this.commentService.getAllComentariosPorPelicula(this.movieId).subscribe({
        next: (response) => {
          if (response.success) {
         //   console.log(response)
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
      }
    });
  }
  addComment() {
    if (!this.nuevoComentario.descripcion.trim()){
      return
    }
   // console.log(this.nuevoComentario)
    
    this.commentService.crearComentario(this.nuevoComentario).subscribe({
      next: (response) => {
        if (response.success) {
        //  console.log('Comentario agregado:', response.data);
          // Limpiar el formulario
          this.nuevoComentario.descripcion = '';
          // Aquí puedes actualizar la lista de comentarios
          this.loadComments(this.movieId)
        }
      },
      error: (err) => {
        console.error('Error al agregar comentario:', err);
        // Mostrar mensaje de error al usuario
      }
    });
  }
}
