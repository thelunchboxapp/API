import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import Restaurant from './Restaurant.js';
import User from './User.js';

const Review = sequelize.define('Review', {

  reviewid: {
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
  rating: DataTypes.FLOAT,
  date: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  comment: DataTypes.TEXT,
  price: DataTypes.INTEGER
}, {
  timestamps: false,
  tableName: 'reviews'
});


export default Review;