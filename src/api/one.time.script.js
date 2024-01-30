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
//       ST_X(coordinates::geometry) AS longitude,
//       ST_Y(coordinates::geometry) AS latitude
//     FROM
//       restaurants`;

//   return await sequelize.query(query, { type: QueryTypes.SELECT });
// }

// getRestaurantsWithCoordinates().then(restaurants => {
//   console.log(restaurants); // Each restaurant will have longitude and latitude fields
// });

// async function updateRestaurantsWithGeohash() {
//   const restaurants = await getRestaurantsWithCoordinates();

//   for (const restaurant of restaurants) {
//     const geoHash = Geohash.encode(restaurant.longitude, restaurant.latitude, 7);

//     // Update the restaurant's geohash in the database
//     await sequelize.query(
//       `UPDATE restaurants SET geoHash = :geoHash WHERE restaurantid = :restaurantId`, 
//       { 
//         replacements: { geoHash, restaurantId: restaurant.restaurantid },
//         type: QueryTypes.UPDATE 
//       }
//     );

//     // const decoded = Geohash.decode(geoHash);
//     // console.log(`Restaurant ${restaurant.restaurantid} has geohash ${geoHash} which decodes to latitude ${decoded.lat} and longitude ${decoded.lon}`)
//   }

//   console.log('All restaurants updated with geohashes');
// }

// // updateRestaurantsWithGeohash().catch(console.error);
// export { updateRestaurantsWithGeohash}