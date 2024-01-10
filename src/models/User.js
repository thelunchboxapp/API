import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const User = sequelize.define('User', {
    firebaseUid: {
        primaryKey: true,
        type: DataTypes.STRING,
    allowNull: false,
    unique: true
    },
    username: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
    name: {
      type: DataTypes.STRING,
      unique: false,
      allowNull: true
    },
    email: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false
    },
  },
  {
    createdAt: true,
    updatedAt: false,
    tableName: 'users'
  });
  
  export default User;