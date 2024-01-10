import {DataTypes} from 'sequelize';
import {sequelize} from '../config/db.js';
import User from './User.js';

const Follow = sequelize.define('Follow', {
    followid: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    followerUid: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
        model: User,
        key: 'firebaseUid',
        }
    },
    followingUid: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
        model: User,
        key: 'firebaseUid',
        }
    }
    }, {
    timestamps: true,
    tableName: 'follows'
    });

export default Follow;