'use strict';
const bcrypt = require('bcrypt');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    // Contraseñas hasheadas
    const saltRounds = 10;
    const password1 = await bcrypt.hash('Usuario123!', saltRounds);
    const password2 = await bcrypt.hash('Contraseña456@', saltRounds);
    const password3 = await bcrypt.hash('SecurePass789#', saltRounds);

    return queryInterface.bulkInsert('usuarios', [
      {
        nombre: 'Juan',
        nombre_usuario: 'juanperez',
        apellido: 'Pérez',
        edad: 28,
        correo_electronico: 'juan@example.com',
        contrasena: password1,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'María',
        nombre_usuario: 'mariagarcia',
        apellido: 'García',
        edad: 32,
        correo_electronico: 'maria@example.com',
        contrasena: password2,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        nombre: 'Carlos',
        nombre_usuario: 'carlosrod',
        apellido: 'Rodríguez',
        edad: 25,
        correo_electronico: 'carlos@example.com',
        contrasena: password3,
        createdAt: new Date(),
        updatedAt: new Date()
      }
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('usuarios', null, {});
  }
};