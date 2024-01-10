import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Restaurant = sequelize.define('restaurant', {
  restaurantid: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    unique: true
  },
  foreignresid: DataTypes.STRING,
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  address: DataTypes.STRING,
  city: DataTypes.STRING,
  state: DataTypes.STRING,
  country: DataTypes.STRING,
  postalcode: DataTypes.STRING,
  //coordinates: DataTypes.GEOMETRY('POINT'),
  stars: DataTypes.DOUBLE,
  pricerange: DataTypes.INTEGER,
  cuisine: DataTypes.STRING,
  // namesearchvector: {
  //   type: DataTypes.TSVECTOR,
  //   allowNull: true
  // }
},
{
  timestamps: false,
  tableName: 'restaurants'
}
);

// Define a hook to update the nameSearchVector whenever a restaurant's name changes
// Restaurant.addHook('beforeSave', (restaurant) => {
//   if (restaurant.changed('name')) {
//     // Update the search vector using sequelize.fn and sequelize.literal
//     restaurant.nameSearchVector = sequelize.fn('to_tsvector', sequelize.literal('plainto_tsquery(' + sequelize.escape(restaurant.name) + ')'));
//   }
// });

export default Restaurant;