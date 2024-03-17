'use strict';
const {
  Model, BOOLEAN
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Orders extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Orders.belongsTo(models.Products, {foreignKey: "product_id"});
      Orders.belongsTo(models.Carts, {foreignKey: "cart_id"});
    }
  }
  Orders.init({
    cart_id: DataTypes.INTEGER,
    product_id: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    buy: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'Orders',
  });
  return Orders;
};