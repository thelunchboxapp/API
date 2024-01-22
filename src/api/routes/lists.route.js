import express from "express"
import ListsCtrl from "../lists.controller.js"

const router = express.Router()

router
  .route("/")
  .get(ListsCtrl.apiGetList)
  .post(ListsCtrl.apiPostList)
  .put(ListsCtrl.apiUpdateList)
  .delete(ListsCtrl.apiDeleteList)

router.route("/user/:id").get(ListsCtrl.apiGetListsByUserId)

router
  .route("/item")
  .post(ListsCtrl.apiPostListItem)
  .delete(ListsCtrl.apiDeleteListItem)

export default router 