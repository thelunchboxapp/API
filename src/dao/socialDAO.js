import {sequelize, Op} from '../config/db.js';
import Follow from '../models/Follow.js';

export default class SocialDAO {

    static async getFollowers({
        userUid = null,
    } = {}) {
        try {
            const followers = await Follow.findAll({
                where: {followingUid: userUid},
                order: [['createdAt', 'DESC']]
            });
            return followers;
        } catch (e) {
            console.error(`Unable to get followers: ${e}`);
            throw e;
        }
    }

    static async getFollowing({
        userUid = null,
    } = {}) {
        try {
            const following = await Follow.findAll({
                where: {followerUid: userUid},
                order: [['createdAt', 'DESC']]
            });
            return following;
        } catch (e) {
            console.error(`Unable to get following: ${e}`);
            throw e;
        }
    }

    static async getConnections({
        userUid = null,
    } = {}) {
        try {
            const connections = await sequelize.query(`
                SELECT f1.*
                FROM follows AS f1
                INNER JOIN follows AS f2 ON f1."followerUid" = f2."followingUid" AND f1."followingUid" = f2."followerUid"
                WHERE f1."followerUid" = :userUid
                ORDER BY f1."createdAt" DESC
            `, {
                replacements: { userUid },
                type: sequelize.QueryTypes.SELECT,
                model: Follow, // Assuming 'Follow' is your Sequelize model
                mapToModel: true // Maps the results to the model properties
            });

            return connections;
        } catch (e) {
            console.error(`Unable to get connections: ${e}`);
            throw e;
        }
    }


    static async addFollow(followerUid, followingUid) {
        try {
            const followDoc = {
                followerUid: followerUid,
                followingUid: followingUid,
            };
            if (followerUid === followingUid) {
                throw new Error("You cannot follow yourself");
            }
            if (await SocialDAO.isFollowing(followerUid, followingUid)) {
                throw new Error("You are already following this user");
            }
            return await Follow.create(followDoc);
        } catch (e) {
            console.error(`Unable to add follow: ${e}`);
            throw e;
            
        }
    }

    static async deleteFollow(followerUid, followingUid) {
        try {
            const deleteResponse = await Follow.destroy({
                where: {followerUid: followerUid, followingUid: followingUid}
            });

            return deleteResponse;
        } catch (e) {
            console.error(`Unable to delete follow: ${e}`);
            throw e;
        }
    }

    static async isFollowing(followerUid, followingUid) {
        try {
            const following = await Follow.findOne({
                where: { followerUid: followerUid, followingUid: followingUid }
            });

            return following !== null; 
        } catch (e) {
            console.error(`Unable to get following: ${e}`);
            throw e;
        }
    }
    
}