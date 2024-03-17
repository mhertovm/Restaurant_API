'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Products.belongsTo(models.Categories, {foreignKey: "category_id"});
      Products.hasMany(models.Orders, {foreignKey: "product_id"});
      Products.hasMany(models.Favorites, {foreignKey: "product_id"});
      Products.hasMany(models.Reviews, {foreignKey: "product_id"});
    }
  }
  Products.init({
    category_id: DataTypes.INTEGER,
    name_am: DataTypes.STRING,
    name_en: DataTypes.STRING,
    description_am: DataTypes.TEXT,
    description_en: DataTypes.TEXT,
    price: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    discount: DataTypes.INTEGER,
    image: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Products',
  });
  return Products;
};