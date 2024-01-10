import Wishlist from '../models/Wishlist.js';
import { sequelize } from '../config/db.js';

export default class WishlistsDAO {

    static async getWishlistsByUserId(userid){
        try {
            const wishlist = await Wishlist.findAll({where: {firebaseUid: userid}})
            return wishlist;
          } catch (e) {
            console.error(`Something went wrong in getWishlistsByYserID: ${e}`);
            throw e;
          }
    }
  
  static async addWishlist(restaurantId, userId, cuisine, priority, date) {
    try {
      const wishlistDoc = {
        restaurantid: restaurantId,
        firebaseUid: userId,
        cuisine: cuisine,
        priority: priority,
        date: date,
      };
      
      return await Wishlist.create(wishlistDoc);
    } catch (e) {
      console.error(`Unable to add wishlist: ${e}`);
      return { error: e };
    }
  }

  static async updateWishlist(wishId, userId, restaurantId, cuisine, priority, date) {
    try {
      const updateResponse = await Wishlist.update(
        { 
            restaurantid: restaurantId,
            cuisine: cuisine,
            priority: priority,
            date: date,
        },
        { where: { wishid: wishId, firebaseUid: userId } }
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update wishlist: ${e}`);
      return { error: e };
    }
  }

  static async deleteWishlist(wishId, userId) {
    try {
      const deleteResponse = await Wishlist.destroy({
        where: { wishid: wishId, firebaseUid: userId }
      });

      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete wishlist: ${e}`);
      return { error: e };
    }
  }
}
