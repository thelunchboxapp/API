import { DataTypes } from 'sequelize';
import { sequelize } from '../config/db.js';
import List from './List.js';
import Restaurant from './Restaurant.js';

const ListItem = sequelize.define('ListItem', {
      listitemid: {
     type: DataTypes.INTEGER,
     primaryKey: true,
     autoIncrement: true
      },
    
      listid: {
     type: DataTypes.INTEGER,
     allowNull: false,
     references: {
        model: List, 
        key: 'listid', 
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
      }

    }, {
      timestamps: false,
      tableName: 'listitems'
    });

export default ListItem;