'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Users.hasOne(models.Carts, {foreignKey: "user_id"});
      Users.hasMany(models.Favorites, {foreignKey: "user_id"});
      Users.hasMany(models.Bookings, {foreignKey: "user_id"});
      Users.hasMany(models.Reviews, {foreignKey: "user_id"});
    }
  }
  Users.init({
    name: DataTypes.STRING,
    surname: DataTypes.STRING,
    gender: DataTypes.STRING,
    age: DataTypes.INTEGER,
    phone: DataTypes.INTEGER,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    role: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Users',
  });
  return Users;
};