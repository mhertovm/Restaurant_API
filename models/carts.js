'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Carts extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Carts.belongsTo(models.Users, {foreignKey: "user_id"});
      Carts.hasMany(models.Orders, {foreignKey: "cart_id"});
    }
  }
  Carts.init({
    user_id: DataTypes.INTEGER,
    discount: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Carts',
  });
  return Carts;
};