'use strict';

const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const process = require('process');
const basename = path.basename(__filename);
const env = process.env.NODE_ENV || 'development';
const config = require(__dirname + '/../config/config.json')[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable], config);
} else {
  sequelize = new Sequelize(config.database, config.username, config.password, config);
}

fs
  .readdirSync(__dirname)
  .filter(file => {
    return (
      file.indexOf('.') !== 0 &&
      file !== basename &&
      file.slice(-3) === '.js' &&
      file.indexOf('.test.js') === -1
    );
  })
  .forEach(file => {
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

// Reseñas y Usuarios
db.Reseñas.belongsTo(db.usuario, { foreignKey: 'usuarioId', as: 'usuario' });
db.usuario.hasMany(db.Reseñas, { foreignKey: 'usuarioId', as: 'reseñas' });

// Reseñas y Peliculas
db.Reseñas.belongsTo(db.peliculas, { foreignKey: 'peliculaId', as: 'pelicula' });
db.peliculas.hasMany(db.Reseñas, { foreignKey: 'peliculaId', as: 'reseñas' });

// Usuarios y Peliculas Favoritas (Relación Muchos a Muchos)
db.usuario.belongsToMany(db.peliculas, {
  through: 'UsuarioPeliculaFavorita',
  as: 'peliculasFavoritas',
  foreignKey: 'usuarioId'
});

db.peliculas.belongsToMany(db.usuario, {
  through: 'UsuarioPeliculaFavorita',
  as: 'usuariosFavoritos',
  foreignKey: 'peliculaId'
});

module.exports = db;
