import {Review, User, Follow, Restaurant} from '../models/index.js';
import { sequelize, Op } from '../config/db.js';

export default class ReviewsDAO {

  static async getReviewsByUserId(userid, page, pageSize){
    try {
        const review = await Review.findAll({
          where:  {firebaseUid: userid}, 
          include: [{ 
            model: Restaurant,
            attributes: { exclude: ['coordinates'] }
          }],
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

  static async updateReview(reviewId, comment, price, rating, date) {
    try {
      const updateResponse = await Review.update(
        { 
          comment: comment,
          price: price,
          rating: rating,
          date: date,
        },
        { where: { reviewid: reviewId } }
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update review: ${e}`);
      return { error: e };
    }
  }

  static async deleteReview(reviewId) {
    try {
      const deleteResponse = await Review.destroy({
        where: { reviewid: reviewId}
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
        where: { firebaseUid: { [Op.in]: friendsIds } },
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

  // static async getLatestReviewsGeneral(page, pageSize){
  //   try {
  //     const reviews = await Review.findAll({
  //       include: [
  //         { model: User, attributes: ['username', 'name'] },
  //         { model: Restaurant, attributes: ['name', 'address', 'city', 'state'] }
  //       ],
  //       order: [['date', 'DESC']],
  //       limit: pageSize,
  //       offset: pageSize * (page)
  //     });

  //     return reviews;
  //   } catch (e) {
  //     console.error(`Unable to get latest general reviews: ${e}`);
  //     throw e;
  //   }
  // }
  static async getLatestReviewsGeneral(userId, page, pageSize){
    try {
      // First, get the IDs to exclude: the user's ID and those they are following
      const friends = await Follow.findAll({
        where: { followerUid: userId },
        attributes: ['followingUid']
      });
  
      const friendsIds = friends.map(friend => friend.followingUid);
      // Include the user's own ID to exclude their reviews as well
      const excludeIds = [...friendsIds, userId];
      console.log(excludeIds)
  
      // Now, query for reviews excluding the specified user IDs
      const reviews = await Review.findAll({
        where: {
          firebaseUid: { [Op.notIn]: excludeIds } // Use Op.notIn to exclude the user and their friends' IDs
        },
        include: [
          { model: User, attributes: ['username', 'name'] },
          { model: Restaurant, attributes: ['name', 'address', 'city', 'state'] }
        ],
        order: [['date', 'DESC']],
        limit: pageSize,
        offset: pageSize * page
      });
  
      return reviews;
    } catch (e) {
      console.error(`Unable to get latest general reviews: ${e}`);
      throw e;
    }
  }
  
}
