'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Bookings extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Bookings.belongsTo(models.Users, {foreignKey: "user_id"});
      Bookings.belongsTo(models.Tables, {foreignKey: "table_id"});
    }
  }
  Bookings.init({
    user_id: DataTypes.INTEGER,
    table_id: DataTypes.INTEGER,
    fromYear: DataTypes.INTEGER,
    fromMonth: DataTypes.INTEGER, 
    fromDay: DataTypes.INTEGER, 
    fromHour: DataTypes.INTEGER, 
    toYear: DataTypes.INTEGER, 
    toMonth: DataTypes.INTEGER, 
    toDay: DataTypes.INTEGER, 
    toHour: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Bookings',
  });
  return Bookings;
};