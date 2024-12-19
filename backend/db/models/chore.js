'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Chore extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Chore.belongsTo(models.User, {foreignKey: 'ownerId'})
      Chore.hasOne(models.User, {foreignKey: 'assignedTo'})
    }
  }
  Chore.init({
    ownerId: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    assignedTo: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    dueDate: {
      type: DataTypes.DATE
    },
    isCompleted: {
      type: DataTypes.BOOLEAN
    }
  }, {
    sequelize,
    modelName: 'Chore',
  });
  return Chore;
};