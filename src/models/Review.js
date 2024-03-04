import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';


const Review = sequelize.define('Review', {

  reviewid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },

  firebaseUid: {
    type: DataTypes.STRING,
    // allowNull: false,
  },
  restaurantid: {
    type: DataTypes.INTEGER,
    allowNull: false,
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