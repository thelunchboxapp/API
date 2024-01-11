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
}