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
      const pageSize = req.query.pageSize ? parseInt(req.query.pageSize, 10) : 20;
      const page = req.query.page ? parseInt(req.query.page, 10) : 0;
      let reviews = await ReviewsDAO.getReviewsByRestaurantId(restaurantid, page, pageSize);

      if (!reviews) {
        res.status(404).json({ error: "Not found" });
        return;
      }

      // Map reviews to include username
      reviews = reviews.map(review => {
        const { User, ...reviewWithoutUser } = review.dataValues; // Destructure to separate User and the rest of review properties
        return {
            ...reviewWithoutUser,
            username: User ? User.username : null, // Add username directly to the review object
        };
    });

      res.json(reviews);
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

  static async apiLatestReviews(req, res, next) {
    console.log('apiLatestReviews');
    const userId = req.query.firebaseUid; 
    const { latitude, longitude } = req.query; 

    console.log('userId', userId);
    console.log('latitude', latitude);
    console.log('longitude', longitude);
    if (!userId || !latitude || !longitude) {
        return res.status(400).json({ error: 'Missing required query parameters' });
    }

    try {
        const friendReviews = await ReviewsDAO.getLatestReviewsByFriends(userId);
        const localReviews = await ReviewsDAO.getLatestReviewsByLocation(latitude, longitude);
        
        res.json({
            friendReviews,
            localReviews
        });
    } catch (e) {
        console.error(`API error: ${e}`);
        res.status(500).json({ error: 'Internal server error' });
    }
  }
}
