'use strict';
const bcrypt = require('bcrypt')
const { v4: uuidv4 } = require('uuid');
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  User.init({
    username: DataTypes.STRING,
    password: DataTypes.STRING,
    register_date: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'User',
    timestamps: false
  });
  User.beforeCreate( async (user) => {
    user.id = await uuidv4()
    user.password = await bcrypt.hash(user.password, 8)
  })

  User.prototype.toJSON = function () {
    const values = Object.assign({}, this.get());

    // delete values.password;
    return values;
  }

  return User;
};