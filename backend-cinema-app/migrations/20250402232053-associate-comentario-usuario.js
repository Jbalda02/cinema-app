'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.addConstraint('comentarioxusuarios', {
      fields: ['comentario_id_comentario'],
      name: 'comentario_id_fk',
      type: 'foreign key',
      references: {
      table: 'comentarios',
      field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'set null'
      });
      await queryInterface.addConstraint('comentarioxusuarios', {
      fields: ['usuario_id_usuario'],
      name: 'usuario_id_fk',
      type: 'foreign key',
      references: {
      table: 'usuarios',
      field: 'id'
      },
      onDelete: 'cascade',
      onUpdate: 'set null'
      });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.removeConstraint('comentarioxusuarios', 'comentario_id_fk')
    await queryInterface.removeConstraint('comentarioxusuarios', 'usuario_id_fk')
      
  }
};
