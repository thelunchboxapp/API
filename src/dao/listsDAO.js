import List from '../models/List.js';
import { sequelize } from '../config/db.js';

export default class ListsDAO {

    static async getListsByUserId(userid){
        try {
            const list = await List.findAll({where: {firebaseUid: userid}})
            return list;
          } catch (e) {
            console.error(`Something went wrong in getListsByYserID: ${e}`);
            throw e;
          }
    }
  
  static async addList(restaurantId, userId, cuisine, priority, date) {
    try {
      const listDoc = {
        restaurantid: restaurantId,
        firebaseUid: userId,
        cuisine: cuisine,
        priority: priority,
        date: date,
      };
      
      return await List.create(listDoc);
    } catch (e) {
      console.error(`Unable to add list: ${e}`);
      return { error: e };
    }
  }

  static async updateList(listId, userId, restaurantId, cuisine, priority, date) {
    try {
      const updateResponse = await List.update(
        { 
            restaurantid: restaurantId,
            cuisine: cuisine,
            priority: priority,
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
    try {
      const deleteResponse = await List.destroy({
        where: { listid: listId, firebaseUid: userId }
      });

      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete list: ${e}`);
      return { error: e };
    }
  }
}
