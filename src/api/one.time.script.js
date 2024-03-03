// // import RestaurantsDAO from "../dao/restaurantsDAO.js";
// import Restaurant from '../models/Restaurant.js';
// import Geohash from 'latlon-geohash';
// import { sequelize } from '../config/db.js';
// import { QueryTypes } from 'sequelize';

// async function getRestaurantsWithCoordinates() {
//   const query = `
//     SELECT
//       restaurantid,
//       name,
//       city,
//       ST_X(coordinates::geometry) AS latitude,
//       ST_Y(coordinates::geometry) AS longitude
//     FROM
//       restaurants`;

//   return await sequelize.query(query, { type: QueryTypes.SELECT });
// }

// getRestaurantsWithCoordinates().then(restaurants => {
//   console.log(restaurants); // Each restaurant will have longitude and latitude fields
// });

// async function updateRestaurantsWithGeohash() {
//     const restaurants = await getRestaurantsWithCoordinates();
  
//     for (const restaurant of restaurants) {
//       const geoHash = Geohash.encode(restaurant.latitude, restaurant.longitude, 5);
//       console.log(`Updating restaurant ${restaurant.restaurantid} at coords ${restaurant.latitude} and ${restaurant.longitude}with geohash ${geoHash}`)
  
//       // Update the restaurant's geohash in the database
//       await sequelize.query(
//         `UPDATE restaurants SET geoHash = :geoHash WHERE restaurantid = :restaurantId`, 
//         { 
//           replacements: { geoHash, restaurantId: restaurant.restaurantid },
//           type: QueryTypes.UPDATE 
//         }
//       );
//     }
  
//     console.log('All restaurants updated with geohashes');
//   }

// // updateRestaurantsWithGeohash().catch(console.error);
// export { updateRestaurantsWithGeohash}