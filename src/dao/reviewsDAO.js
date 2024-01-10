import Review from '../models/Review.js';
import { sequelize } from '../config/db.js';

export default class ReviewsDAO {

  static async getReviewsByUserId(userid){
    try {
        const review = await Review.findAll({where: {firebaseUid: userid}})
        return review;
      } catch (e) {
        console.error(`Something went wrong in getReviewsByUserID: ${e}`);
        throw e;
      }
}

static async getReviewsByRestaurantId(restaurantid){
  try {
      const review = await Review.findAll({where: {restaurantid: restaurantid}})
      return review;
    } catch (e) {
      console.error(`Something went wrong in getReviewsByUserID: ${e}`);
      throw e;
    }
}
  
  static async addReview(restaurantId, userId, comment, price, rating, date) {
    try {
      const reviewDoc = {
        restaurantid: restaurantId,
        firebaseUid: userId,
        comment: comment,
        price: price,
        rating: rating,
        date: date,
      };
      
      return await Review.create(reviewDoc);
    } catch (e) {
      console.error(`Unable to post review: ${e}`);
      return { error: e };
    }
  }

  static async updateReview(reviewId, userId, comment, price, rating, date) {
    try {
      const updateResponse = await Review.update(
        { 
          comment: comment,
          price: price,
          rating: rating,
          date: date,
        },
        { where: { reviewid: reviewId, firebaseUid: userId } }
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      return { error: e };
    }
  }

  static async deleteReview(reviewId, userId) {
    try {
      const deleteResponse = await Review.destroy({
        where: { reviewid: reviewId, firebaseUid: userId }
      });

      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete review: ${e}`);
      return { error: e };
    }
  }
}
