export interface Movie {
    id: number;
    title: string;
    poster_path: string;
    vote_average: number;
    original_language: string;
    budget: number;
    revenue: number;
    status: string;
    overview: string;
    // ... otras propiedades de la película
  }
  
  export interface Cast {
    cast: Actor[];
  }
  
  export interface Actor {
    id: number;
    name: string;
    profile_path: string;
    // ... otras propiedades del actor
  }
  
  export interface Reviews {
    results: Review[];
  }
  
  export interface Review {
    author: string;
    content: string;
    // ... otras propiedades de la reseña
  }
  

export interface Comentario {
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
export interface ComentariosResponse {
  success: boolean;
  data: Comentario[];
  meta?: {
    total: number;
    currentPage: number;
    totalPages: number;
  };
  error?: string; // Propiedad opcional para errores
}