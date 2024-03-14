import{ User, Follow }from '../models/index.js';
import { sequelize, Op } from '../config/db.js';

export default class UsersDAO {
    static async addUser(firebaseUid, username, name, email, createdAt) {
        try {
            const userDoc = {
                firebaseUid: firebaseUid,
                username: username,
                name: name,
                email: email,
                createdAt: createdAt
            };

            return await User.create(userDoc);
        } catch(e) {
            console.error(`Unable to add user: ${e}`);
            return { error: e };
        }
    }

    static async searchUsers(searchingUserUid, searchName) {
        try {
            const users = await User.findAll({
                where: {
                    [Op.and]: [
                        {
                            [Op.or]: [
                                {
                                    name: {
                                        [Op.iLike]: `%${searchName}%`
                                    }
                                },
                                {
                                    username: {
                                        [Op.iLike]: `%${searchName}%`
                                    }
                                }
                            ]
                        },
                        {
                            firebaseUid: {
                                [Op.ne]: searchingUserUid // Exclude the user's own data
                            }
                        }
                    ]
                },
                attributes: {
                    include: [
                        [sequelize.literal(`EXISTS(SELECT 1 FROM follows WHERE follows."followingUid" = "User"."firebaseUid" AND follows."followerUid" = '${searchingUserUid}')`), 'isFollowing']
                    ]
                }
            });
    
            return users.map(user => {
                const userJson = user.toJSON();
                // Transform isFollowing from a Sequelize literal/existence check to a boolean
                userJson.isFollowing = !!userJson.isFollowing; 
                return userJson;
            });
        } catch (e) {
            console.error(`Unable to search users: ${e}`);
            throw e;
        }
    }
    

    static async updateUser(firebaseUid, username, name, email) {
        try{
            const updateResponse = await User.update(
                {
                    username: username,
                    name: name,
                    email: email
                },
                {where: { firebaseUid: firebaseUid }}
            );

            return updateResponse;

        } catch(e) {
            console.error(`Unable to update user: ${e}`);
            return { error: e};
        }
    }

    static async deleteUser(firebaseUid) {
        try{
            const deleteResponse = await User.destroy(
                {
                    where: { firebaseUid: firebaseUid }
                }
            );

            return deleteResponse;

        } catch (e) {
            console.error(`Unable to delete user: ${e}`);
            return { error: e };
          }
    }

    // static async getUser(firebaseUid) {
    //     try {
    //         const user = await User.findOne({
    //             where: { firebaseUid: firebaseUid }
    //         });
    //         return user;
    //     } catch (e) {
    //         console.error(`Unable to get user: ${e}`);
    //         return { error: e };
    //     }
    // }
    static async getUser(firebaseUid) {
        try {
            const user = await User.findOne({
                where: { firebaseUid: firebaseUid },
                attributes: {
                    include: [
                        // Include follower count
                        [sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM "follows" AS "followers"
                            WHERE
                                "followers"."followingUid" = "User"."firebaseUid"
                        )`), 'followersCount'],
    
                        // Include following count
                        [sequelize.literal(`(
                            SELECT COUNT(*)
                            FROM "follows" AS "following"
                            WHERE
                                "following"."followerUid" = "User"."firebaseUid"
                        )`), 'followingCount']
                    ]
                }
            });
    
            // if (user) {
            //     const result = user.toJSON();
            //     result.followersCount = parseInt(result.followersCount, 10);
            //     result.followingCount = parseInt(result.followingCount, 10);
            //     return result;
            // }
            return user;
        } catch (e) {
            console.error(`Unable to get user: ${e}`);
            return { error: e };
        }
    }

    static async isUsernameAvailable(username) {
        try {
            const user = await User.findOne({ where: { username: username } });
            return !user; // Returns true if the username is available (user is null)
        } catch (e) {
            console.error(`Unable to check username availability: ${e}`);
            throw e;
        }
    }
    
    static async isEmailAvailable(email) {
        try {
            const user = await User.findOne({ where: { email: email } });
            return !user; // Returns true if the email is available (user is null)
        } catch (e) {
            console.error(`Unable to check email availability: ${e}`);
            throw e;
        }
    }    
}