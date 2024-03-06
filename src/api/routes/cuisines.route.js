import express from "express"
import CuisinesCtrl from "../cuisines.controller.js"

const router = express.Router()

router.route("/").get(CuisinesCtrl.apiGetCuisines)
router.route("/top").get(CuisinesCtrl.apiGetTopCuisines)

export default router