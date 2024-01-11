import express from "express"
import UsersCtrl from "../users.controller.js"

const router = express.Router()

router
    .route("/")
    .post(UsersCtrl.apiPostUser)
    .put(UsersCtrl.apiUpdateUser)
    .delete(UsersCtrl.apiDeleteUser)

export default router