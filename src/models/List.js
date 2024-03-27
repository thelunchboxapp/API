import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import User from './User.js';

const List = sequelize.define('List', {

  listid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  firebaseUid: {
    type: DataTypes.STRING,
    allowNull: false,
    references: {
      model: User, // Name of the Users model
      key: 'firebaseUid', // Key in Users to which it refers
    }
  },
  description: {
    type: DataTypes.TEXT,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: false,
  tableName: 'lists'
});

export default List;