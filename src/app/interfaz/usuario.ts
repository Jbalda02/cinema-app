export interface Usuario {
    // src/app/models/user.model.ts
    id_usuario?: number;
    nombre: string;
    nombre_usuario: string;
    correo_electronico: string;
    contrasena?: string; // Opcional porque no deberíamos exponerla
    apellido?: string;
    edad?: number;
}
