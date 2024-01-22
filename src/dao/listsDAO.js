import List from '../models/List.js';
import { sequelize } from '../config/db.js';
import ListItem from '../models/ListItem.js';

export default class ListsDAO {

static async getList(id) {
  try {
    const list = await List.findByPk(id, {
      include: [{
        model: ListItem,
        as : 'listitems'
      }]
    });

    if (!list) {
      return null;
    }

    return list;
  } catch (e) {
    console.error(`Unable to get list: ${e}`);
    return { error: e };
  }
}


    static async getListsByUserId(userid){
        try {
            const list = await List.findAll({where: {firebaseUid: userid}})
            return list;
          } catch (e) {
            console.error(`Something went wrong in getListsByYserID: ${e}`);
            throw e;
          }
    }
  
  static async addList(userId, description, date) {
    try {
      const listDoc = {
        firebaseUid: userId,
        description: description,
        date: date,
      };
      
      return await List.create(listDoc);
    } catch (e) {
      console.error(`Unable to add list: ${e}`);
      return { error: e };
    }
  }

  static async updateList(listId, userId, description, date) {
    try {
      const updateResponse = await List.update(
        { 
            description: description,
            date: date,
        },
        { where: { listid: listId, firebaseUid: userId } }
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update list: ${e}`);
      return { error: e };
    }
  }

  static async deleteList(listId, userId) {
    const transaction = await sequelize.transaction();

    try {
      await ListItem.destroy({
        where: { listid: listId },
        transaction: transaction
      });
  
      const deleteResponse = await List.destroy({
        where: { listid: listId, firebaseUid: userId },
        transaction: transaction
      });
  
      await transaction.commit();
  
      return deleteResponse;
    } catch (e) {
      await transaction.rollback();
      console.error(`Unable to delete list: ${e}`);
      return { error: e };
    }
  }

  static async addListItem(listId, restaurantId) {
    try {
      const listItemDoc = {
        listid: listId,
        restaurantid: restaurantId,
      };
      
      return await ListItem.create(listItemDoc);
    } catch (e) {
      console.error(`Unable to add list item: ${e}`);
      return { error: e };
    }
  }

  static async deleteListItem(listItemId) {
    try {
      const deleteResponse = await ListItem.destroy({
        where: { listitemid: listItemId }
      });

      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete list item: ${e}`);
      return { error: e };
    }
  }
}
