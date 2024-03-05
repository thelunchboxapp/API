import {Review, User} from '../models/index.js';
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

static async getReviewsByRestaurantId(restaurantid, page, pageSize){
  try {
      const review = await Review.findAll({
        where: {restaurantid: restaurantid}, 
        include: [{ model: User, attributes: ['username'] }],
        order: [['date', 'DESC']],
        limit: pageSize,
        offset: pageSize * (page)
      })
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

  static async getLatestReviewsByFriends(userId) {
    try {
      // Assuming 'Follow' model tracks who follows whom
      // Fetching user IDs that the given user follows
      const friends = await Follow.findAll({
        where: { followerUid: userId },
        attributes: ['followingUid']
      });
  
      const friendsIds = friends.map(friend => friend.followingUid);
  
      // Now, find all reviews made by these friends
      const reviews = await Review.findAll({
        where: { firebaseUid: { [sequelize.Op.in]: friendsIds } },
        include: [
          { model: User, attributes: ['username', 'name'] },
          { model: Restaurant, attributes: ['name', 'address', 'city', 'state'] }
        ],
        order: [['date', 'DESC']],
        // Add a limit if necessary
      });
  
      return reviews;
    } catch (e) {
      console.error(`Unable to get latest reviews by friends: ${e}`);
      throw e;
    }
  }
  

  static async getLatestReviewsByLocation(latitude, longitude){
    return null;
  }
}
