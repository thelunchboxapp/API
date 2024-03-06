import CuisineDAO from '../dao/cuisinesDAO.js';

export default class CuisinesController {

    static async apiGetCuisines(req, res, next) {
        try {
            const cuisines = await CuisineDAO.getCuisines();
            res.json(cuisines);
        } catch(e) {
            console.log(`api, ${e}`);
            res.status(500).json({ error: e });
        }
    }
    
    static async apiGetTopCuisines(req, res, next) {
        try {
            const topCuisines = await CuisineDAO.getTopCuisines();
            res.json(topCuisines);
        } catch(e) {
            console.log(`api, ${e}`);
            res.status(500).json({ error: e });
        }
    }
}