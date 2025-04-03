// models/reseñas.js
const { DataTypes, Model } = require('sequelize');
const sequelize = require('../config/database'); 
const Usuarios = require('./usuarios'); 
//const Peliculas = require('./peliculas'); 

class Reseñas extends Model {}

Reseñas.init({
  contenido: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  calificacion: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  peliculaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  usuarioId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
}, {
  sequelize,
  modelName: 'Reseñas',
});

Reseñas.belongsTo(Usuarios, { foreignKey: 'usuarioId' });
Reseñas.belongsTo(Peliculas, { foreignKey: 'peliculaId' });

module.exports = Reseñas;