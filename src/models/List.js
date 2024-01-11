import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import Restaurant from './Restaurant.js';
import User from './User.js';

const List = sequelize.define('List', {

  listid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  firebaseUid: {
    type: DataTypes.STRING,
    // allowNull: false,
    references: {
      model: User, // Name of the Users model
      key: 'firebaseUid', // Key in Users to which it refers
    }
  },
  restaurantid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Restaurant,
      key: 'restaurantid',
    }
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  cuisine: DataTypes.TEXT,
  priority: DataTypes.TEXT
}, {
  timestamps: false,
  tableName: 'lists'
});

export default List;