import Cuisine from '../models/Cuisine.js';
import { sequelize } from '../config/db.js';

export default class CuisinesDAO {
    static async getCuisines() {
        try {
            const cuisines = await Cuisine.findAll();
            return cuisines;
        } catch (e) {
            console.error(`Unable to get cuisines, ${e}`);
            return { error: e };
        }
    }

    // static async getTopCuisines() {
    //     try {
    //         const cuisines = await Cuisine.findAll({
    //             limit: 5,
    //             order: sequelize.random()
    //         });
    //         return cuisines;
    //     } catch (e) {
    //         console.error(`Unable to get top cuisines, ${e}`);
    //         return { error: e };
    //     }
    // }
}