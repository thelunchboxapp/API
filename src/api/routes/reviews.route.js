import express from "express"
import ReviewsCtrl from "../reviews.controller.js"
// import authenticateUser from '../../middleware/firebase.auth.js';

const router = express.Router()

router
  .route("/")
  // .get(ReviewsCtrl.apiGetReviews)
  .post(ReviewsCtrl.apiPostReview)
  .put(ReviewsCtrl.apiUpdateReview)
  .delete(ReviewsCtrl.apiDeleteReview)
  
  // .post(authenticateUser, ReviewsCtrl.apiPostReview)
  // .put(authenticateUser, ReviewsCtrl.apiUpdateReview)
  // .delete(authenticateUser, ReviewsCtrl.apiDeleteReview)

router.route("/user/:id").get(ReviewsCtrl.apiReviewsByUserId)
router.route("/restaurant/:id").get(ReviewsCtrl.apiReviewsByRestuarantId)
router.route("/latest").get(ReviewsCtrl.apiLatestReviews)

export default router