import express from "express"
import ReviewsCtrl from "../reviews.controller.js"

const router = express.Router()

router
  .route("/")
  .post(ReviewsCtrl.apiPostReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview)

router.route("/user/:id").get(ReviewsCtrl.apiReviewsByUserId)
router.route("/restaurant/:id").get(ReviewsCtrl.apiReviewsByRestuarantId)

export default router 