import express from "express"
import UsersCtrl from "../users.controller.js"

const router = express.Router()

router.get("/check-availability", UsersCtrl.apiCheckAvailability);
router.get("/search/:firebaseUid", UsersCtrl.apiSearchUsers);

router.route("/:firebaseUid")
    .get(UsersCtrl.apiGetUser)
    .put(UsersCtrl.apiUpdateUser)
    .delete(UsersCtrl.apiDeleteUser)

router.route("/")
    .post(UsersCtrl.apiPostUser)

export default router