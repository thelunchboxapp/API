import User from '../models/User.js';
import { sequelize } from '../config/db.js';

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

    static async getUser(firebaseUid) {
        try {
            const user = await User.findOne({
                where: { firebaseUid: firebaseUid }
            });
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