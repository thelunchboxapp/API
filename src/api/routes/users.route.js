import express from "express"
import UsersCtrl from "../users.controller.js"

const router = express.Router()

router.get("/check-availability", UsersCtrl.apiCheckAvailability);

router.route("/:firebaseUid")
    .get(UsersCtrl.apiGetUser)
    .post(UsersCtrl.apiPostUser)
    .put(UsersCtrl.apiUpdateUser)
    .delete(UsersCtrl.apiDeleteUser)




export default router