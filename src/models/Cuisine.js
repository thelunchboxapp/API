import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';

const Cuisine = sequelize.define('Cuisine', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    name: {
        type: DataTypes.STRING(255),
        allowNull: false,
        unique: true
    },
    photo_url: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    timestamps: false, // Assuming you don't need createdAt/updatedAt for cuisines
    tableName: 'cuisines'
});

export default Cuisine;
