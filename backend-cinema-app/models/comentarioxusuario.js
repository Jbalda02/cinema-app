'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class comentarioxusuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here

    }
  }
  comentarioxusuario.init({
    usuario_id_usuario: DataTypes.INTEGER,
    comentario_id_comentario: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'comentarioxusuario',
    tableName: 'comentarioxusuarios'
  });
  return comentarioxusuario;
};