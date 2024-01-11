import { sequelize } from '../config/db.js';
import User from './User.js';
import Review from './Review.js';
import Restaurant from './Restaurant.js';
import Follow from './Follow.js';
import List from './List.js';

// Set up associations

User.hasMany(Follow, { foreignKey: 'followerUid' });
User.hasMany(Review, { foreignKey: 'firebaseUid' });
User.hasMany(List, {foreignKey: 'firebaseUid' });
Review.belongsTo(User, { foreignKey: 'firebaseUid' });
Restaurant.hasMany(Review, { foreignKey: 'restaurantid', as: 'reviews' });
Review.belongsTo(Restaurant, { foreignKey: 'restaurantid' });
List.belongsTo(User, {foreignKey: 'firebaseUid'});

// Export models and sequelize instance
export { sequelize, Review, Restaurant, Follow, User, List };
