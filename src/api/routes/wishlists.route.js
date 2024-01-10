import express from "express"
import WishlistsCtrl from "../wishlists.controller.js"

const router = express.Router()

router
  .route("/")
  .post(WishlistsCtrl.apiPostWishlist)
  .put(WishlistsCtrl.apiUpdateWishlist)
  .delete(WishlistsCtrl.apiDeleteWishlist)

router.route("/user/:id").get(WishlistsCtrl.apiGetWishlistsByUserId)

export default router 