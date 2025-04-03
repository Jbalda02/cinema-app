'use strict';

module.exports = {
  up: async (queryInterface) => {
    // Asignación lógica: usuario 1 hace 2 comentarios, usuario 2 hace 3, etc.
    return queryInterface.bulkInsert('comentarios', [
      {
        descripcion: '¡La película fue increíble!',
        id_pelicula: 497698, // Moana 2
        usuario_id: 1, // Asignado al primer usuario
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        descripcion: 'Las canciones son pegadizas',
        id_pelicula: 497698,
        usuario_id: 1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        descripcion: 'Buena animación pero la trama es débil',
        id_pelicula: 497698,
        usuario_id: 2,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface) => {
    return queryInterface.bulkDelete('comentarios', null, {});
  }
};