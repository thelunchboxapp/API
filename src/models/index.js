import { sequelize } from '../config/db.js';
import User from './User.js';
import Review from './Review.js';
import Restaurant from './Restaurant.js';
import Follow from './Follow.js';
import List from './List.js';
import ListItem from './ListItem.js';

// Set up associations

User.hasMany(Follow, { foreignKey: 'followerUid', as: 'Following' }); 
User.hasMany(Follow, { foreignKey: 'followingUid', as: 'Follower' });
Follow.belongsTo(User, { foreignKey: 'followerUid', as: 'Follower' }); 
Follow.belongsTo(User, { foreignKey: 'followingUid', as: 'Following' });
User.hasMany(Review, { foreignKey: 'firebaseUid' });
User.hasMany(List, {foreignKey: 'firebaseUid' });
Review.belongsTo(User, { foreignKey: 'firebaseUid' });
Restaurant.hasMany(Review, { foreignKey: 'restaurantid', as: 'reviews' });
Review.belongsTo(Restaurant, { foreignKey: 'restaurantid' });
List.belongsTo(User, {foreignKey: 'firebaseUid'});
List.hasMany(ListItem, {foreignKey: 'listid', as: 'listitems'});
ListItem.belongsTo(List, {foreignKey: 'listid'});

// Export models and sequelize instance
export { sequelize, Review, Restaurant, Follow, User, List, ListItem };
