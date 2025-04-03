'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class UsuarioPeliculaFavorita extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  UsuarioPeliculaFavorita.init({
    usuarioId: DataTypes.INTEGER,
    peliculaId: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'UsuarioPeliculaFavorita',
  });
  return UsuarioPeliculaFavorita;
};