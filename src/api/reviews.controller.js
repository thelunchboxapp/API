import ReviewsDAO from "../dao/reviewsDAO.js";

export default class ReviewsController {

  static async apiReviewsByUserId(req, res, next) {
    try {
      let userid = req.params.id || {};
      let review = await ReviewsDAO.getReviewsByUserId(userid);
      if (!review) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.json(review);
    } catch(e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiReviewsByRestuarantId(req, res, next) {
    try {
      let restaurantid = req.params.id || {};
      let review = await ReviewsDAO.getReviewsByRestaurantId(restaurantid);
      if (!review) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.json(review);
    } catch(e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiPostReview(req, res, next) {
    try {
      const restaurantId = req.body.restaurant_id;
      const userId = req.body.user_id;
      const comment = req.body.comment;
      const price = req.body.price;
      const rating = req.body.rating;
      const date = new Date();

      const reviewResponse = await ReviewsDAO.addReview(restaurantId, userId, comment, price, rating, date);
      if (reviewResponse && reviewResponse.reviewid) {
        res.json({ status: "success" });
      } else {
          throw new Error("Error adding review");
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiUpdateReview(req, res, next) {
    try {
      const reviewId = req.body.review_id;
      const userId = req.body.user_id;
      const comment = req.body.comment;
      const price = req.body.price;
      const rating = req.body.rating;
      const date = new Date();

      const updatedRowCount = await ReviewsDAO.updateReview(reviewId, userId, comment, price, rating, date);

      if (updatedRowCount === 0) {
        throw new Error("Unable to update review - user may not be original poster");
      }

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteReview(req, res, next) {
    try {
      const reviewId = req.body.review_id;
      const userId = req.body.user_id;

      const deletedRowCount = await ReviewsDAO.deleteReview(reviewId, userId);

      if (deletedRowCount === 0) {
        throw new Error("Unable to delete review or review not found");
      }

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }
}
