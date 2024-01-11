import {sequelize, Op} from '../config/db.js';
import Restaurant from '../models/Restaurant.js'; 

export default class RestaurantsDAO {

  static async addRestaurant(name, address, city, state, country, postalcode, stars, pricerange, cuisine, latitude, longitude, geoHash){
    try {
      const restaurantDoc = {
        name: name,
        address: address,
        city: city,
        state: state,
        country: country,
        postalcode: postalcode,
        stars: stars,
        pricerange: pricerange,
        cuisine: cuisine,
        latitude: latitude,
        longitude: longitude,
        geoHash: geoHash
      };
      return await Restaurant.create(restaurantDoc);

    } catch (e) {
      console.error(`Unable to post restaurant: ${e}`);
      return { error: e };
    }
  }

  static async updateRestaurant(restaurantId, name, address, city, state, country, postalcode, stars, pricerange, cuisine, latitude, longitude, geoHash){
    try {
      const updateResponse = await Restaurant.update(
        { 
        name: name,
        address: address,
        city: city,
        state: state,
        country: country,
        postalcode: postalcode,
        stars: stars,
        pricerange: pricerange,
        cuisine: cuisine,
        latitude: latitude,
        longitude: longitude,
        geoHash: geoHash
        },
        { where: { restaurantid: restaurantId} }
      );

      return updateResponse;
    } catch (e) {
      console.error(`Unable to update restaurant: ${e}`);
      return { error: e };
    }
  }

  static async deleteRestaurant(restaurantId){
    try{
      const deleteResponse = await Restaurant.destroy({
        where: { restaurantid: restaurantId }
      });

      return deleteResponse;

    } catch (e) {
        console.error(`Unable to update restaurant: ${e}`);
        return { error: e };
    }
  }
  
  static async getRestaurants({
    filters = null,
    page = 0,
    restaurantsPerPage = 20,
    longitude = null,
    latitude = null,
    maxDistance = null // in kilometers
  } = {}) {
    try {
      let whereClause = [];
  
      // Common filters
      if (filters) {
        if ("name" in filters) {
          whereClause.push(`name LIKE '%${filters.name}%'`);
        }
        if ("cuisine" in filters) {
          whereClause.push(`cuisine = '${filters.cuisine}'`);
        }
        if ("zipcode" in filters) {
          whereClause.push(`postalcode = '${filters.zipcode}'`);
        }
      }

  
      // Initialize SQL query
      let query = "SELECT * FROM restaurants";
  
      // Add location-based logic if latitude and longitude are provided
      if (longitude !== null && latitude !== null) {
        query = `
          SELECT 
            *,
            ST_DistanceSphere(
              coordinates::geometry,
              ST_SetSRID(ST_MakePoint(:latitude, :longitude), 4326)
            ) AS distance_in_meters
          FROM 
            restaurants
        `;
  
        // Append location-based filter
        if (maxDistance !== null) {
          whereClause.push(`ST_DistanceSphere(
            coordinates::geometry,
            ST_SetSRID(ST_MakePoint(:latitude, :longitude), 4326)
          ) <= :maxDistance`);
        }
      }
  
      // Combine all where clauses
      if (whereClause.length > 0) {
        query += ` WHERE ${whereClause.join(' AND ')}`;
      }
  
      // Append order by and pagination
      if (longitude !== null && latitude !== null) {
        query += ` ORDER BY distance_in_meters ASC`;
      }
      query += ` LIMIT :limit OFFSET :offset`;
  
      const replacements = {
        longitude,
        latitude,
        maxDistance: maxDistance ? maxDistance * 1000 : null, // Convert kilometers to meters, handle null
        limit: restaurantsPerPage,
        offset: restaurantsPerPage * page
      };
  
      const restaurants = await sequelize.query(query, {
        replacements,
        type: sequelize.QueryTypes.SELECT
      });
  
      // Adjusted query for counting total restaurants
      let countQuery = `SELECT COUNT(*) FROM restaurants`;
      if (whereClause.length > 0) {
        countQuery += ` WHERE ${whereClause.join(' AND ')}`;
      }
  
      const totalNumRestaurantsResult = await sequelize.query(countQuery, {
        replacements,
        type: sequelize.QueryTypes.SELECT
      });
  
      const totalNumRestaurants = totalNumRestaurantsResult[0].count;
  
      return { restaurantsList: restaurants, totalNumRestaurants };
    } catch (e) {
      console.error(`Unable to get restaurants, ${e}`);
      return { restaurantsList: [], totalNumRestaurants: 0 };
    }
  }

  static async getRestaurantByID(id) {
    try {
      const restaurant = await Restaurant.findByPk(id, {
        include: 'reviews' // Assuming you've set up associations correctly
      });
      return restaurant;
    } catch (e) {
      console.error(`Something went wrong in getRestaurantByID: ${e}`);
      throw e;
    }
  }
  
  static async getRestaurantsByGeoHash(locationGeohash){
    try {
        const restaurants = await Restaurant.findAll({where: {geoHash: locationGeohash}})
        return restaurants;
      } catch (e) {
        console.error(`Something went wrong in getRestaurantssByUserID: ${e}`);
        throw e;
      }
  }

  static async getCuisines() {
    try {
      const distinctCuisines = await Restaurant.findAll({
        attributes: [[sequelize.fn('DISTINCT', sequelize.col('cuisine')), 'cuisine']]
      });
      return distinctCuisines.map(row => row.cuisine);
    } catch (e) {
      console.error(`Unable to get cuisines, ${e}`);
      return [];
    }
  }
  
}
