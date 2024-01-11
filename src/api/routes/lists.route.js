import express from "express"
import ListsCtrl from "../lists.controller.js"

const router = express.Router()

router
  .route("/")
  .post(ListsCtrl.apiPostList)
  .put(ListsCtrl.apiUpdateList)
  .delete(ListsCtrl.apiDeleteList)

router.route("/user/:id").get(ListsCtrl.apiGetListsByUserId)

export default router 