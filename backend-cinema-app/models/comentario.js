'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comentario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      comentario.belongsTo(models.usuario, {
        foreignKey: 'usuario_id',
        as: 'usuario'
      });
    }
  }
  comentario.init({
    descripcion: DataTypes.STRING,
    id_pelicula: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'comentario',
    tableName: 'comentarios'
  });
  return comentario;
};