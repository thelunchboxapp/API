import WishlistsDAO from "../dao/wishlistsDAO.js";

export default class WishlistsController {

  static async apiGetWishlistsByUserId(req, res, next) {
    try {
      let userid = req.params.id || {};
      let wishlist = await WishlistsDAO.getWishlistsByUserId(userid);
      if (!wishlist) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.json(wishlist);
    } catch(e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiPostWishlist(req, res, next) {
    try {
      const restaurantId = req.body.restaurant_id;
      const userId = req.body.user_id;
      const cuisine = req.body.cuisine;
      const priority = req.body.priority;
      const date = new Date();

      const wishlistResponse = await WishlistsDAO.addWishlist(restaurantId, userId, cuisine, priority, date);
      if (wishlistResponse && wishlistResponse.wishid) {
        res.json({ status: "success" });
      } else {
          throw new Error("Error adding wishlist");
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateWishlist(req, res, next) {
    try {
      const wishId = req.body.wish_id;
      const userId = req.body.user_id;
      const restaurantId = req.body.restaurant_id;
      const cuisine = req.body.cuisine;
      const priority = req.body.priority;
      const date = new Date();

      const updatedRowCount = await WishlistsDAO.updateWishlist(wishId, userId, restaurantId, cuisine, priority, date);

      if (updatedRowCount === 0) {
        throw new Error("Unable to update wishlist - user may not be original poster");
      }

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteWishlist(req, res, next) {
    try {
      const wishId = req.body.wish_id;
      const userId = req.body.user_id;

      const deletedRowCount = await WishlistsDAO.deleteWishlist(wishId, userId);

      if (deletedRowCount === 0) {
        throw new Error("Unable to delete wish or wish not found");
      }

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
