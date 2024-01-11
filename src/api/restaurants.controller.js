import RestaurantsDAO from "../dao/restaurantsDAO.js";
import Geohash from 'latlon-geohash';

export default class RestaurantsController {

  static async apiPostRestaurant(req, res, next) {
    try {
      const name = req.body.name;
      const address = req.body.address;
      const city = req.body.city;
      const state = req.body.state;
      const country = req.body.country;
      const postalcode = req.body.postalcode;
      const stars = req.body.stars;
      const pricerange = req.body.pricerange;
      const cuisine = req.body.cuisine;
      const latitude = req.body.latitude;
      const longitude = req.body.longitude;
      const geoHash = Geohash.encode(Number(latitude), Number(longitude), 7);
      console.log(geoHash);

      const restaurantResponse = await RestaurantsDAO.addRestaurant(name, address, city, state, country, postalcode, stars, pricerange, cuisine, latitude, longitude, geoHash);
      if (restaurantResponse && restaurantResponse.restaurantid) {
        res.json({ status: "success" });
      } else {
          throw new Error("Error adding restaurant");
      }
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }


  static async apiUpdateRestaurant(req, res, next) {
    try {
      const restaurantId = req.body.restaurant_id;
      const name = req.body.name;
      const address = req.body.address;
      const city = req.body.city;
      const state = req.body.state;
      const country = req.body.country;
      const postalcode = req.body.postalcode;
      const stars = req.body.stars;
      const pricerange = req.body.pricerange;
      const cuisine = req.body.cuisine;
      const latitude = req.body.latitude;
      const longitude = req.body.longitude;
      const geoHash = Geohash.encode(Number(latitude), Number(longitude), 7);

      const updatedRowCount = await RestaurantsDAO.updateRestaurant(restaurantId, name, address, city, state, country, postalcode, stars, pricerange, cuisine, latitude, longitude, geoHash);

      if (updatedRowCount === 0) {
        throw new Error("Unable to update restaurant - user may not be original poster");
      }

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiDeleteRestaurant(req, res, next) {
    try {
      const restaurantId = req.body.restaurant_id;
      const deletedRowCount = await RestaurantsDAO.deleteRestaurant(restaurantId);

      if (deletedRowCount === 0) {
        throw new Error("Unable to delete review or review not found");
      }

      res.json({ status: "success" });
    } catch (e) {
      res.status(500).json({ error: e.message });
    }
  }

  static async apiGetRestaurants(req, res, next) {
    const restaurantsPerPage = req.query.restaurantsPerPage ? parseInt(req.query.restaurantsPerPage, 10) : 20;
    const page = req.query.page ? parseInt(req.query.page, 10) : 0;

    let filters = {};
    if (req.query.cuisine) {
      filters.cuisine = req.query.cuisine;
    } else if (req.query.zipcode) {
      filters.zipcode = req.query.zipcode;
    } else if (req.query.name) {
      filters.name = req.query.name;
    }  //else if (req.query.min_stars) {
      //filters.min_stars = req.query.min_stars;
    //}

    let maxDistance = null;
    let latitude = null;
    let longitude = null;
    console.log('api, ' + req.query.max_distance + ' ' + req.query.lat + ' ' + req.query.lng)
    if (req.query.max_distance && req.query.lat && req.query.lng) {
      maxDistance = parseFloat(req.query.max_distance);
      latitude = parseFloat(req.query.lat);
      longitude = parseFloat(req.query.lng);
    }

    try {
      const { restaurantsList, totalNumRestaurants } = await RestaurantsDAO.getRestaurants({
        filters,
        page,
        restaurantsPerPage,
        longitude,
        latitude,
        maxDistance
      });

      let response = {
        restaurants: restaurantsList,
        page: page,
        filters: filters,
        entries_per_page: restaurantsPerPage,
        total_results: totalNumRestaurants,
      };
      console.log(`api, ${response}`)
      res.json(response);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiGetRestaurantById(req, res, next) {
    try {
      let id = req.params.id || {};
      let restaurant = await RestaurantsDAO.getRestaurantByID(id);
      if (!restaurant) {
        res.status(404).json({ error: "Not found" });
        return;
      }
      res.json(restaurant);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiGetRestaurantCuisines(req, res, next) {
    try {
      let cuisines = await RestaurantsDAO.getCuisines();
      res.json(cuisines);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
  static async apiGetPostRestaurantByLocation(req, res, next) {
    try {
      let latitude = req.body.latitude;
      let longitude = req.body.longitude;
      const restaurantsPerPage = req.body.restaurantsPerPage ? parseInt(req.body.restaurantsPerPage, 10) : 20;
      const page = req.body.page ? parseInt(req.body.page, 10) : 0;
      const geoHash = Geohash.encode(Number(latitude), Number(longitude), 7);
      let depth = 0;
  
      let closebyRestaurants = [];
      let geohashesToCheck = new Set([geoHash]);
      let processedGeohashes = new Set();
    
      async function fetchRestaurants() {
        if (geohashesToCheck.size === 0 || closebyRestaurants.length > restaurantsPerPage * (page + 1) || depth == 20) {
          return;
        }
        depth += 1;
  
        let nextGeohashes = new Set();
        for (let gh of geohashesToCheck) {
          if (processedGeohashes.has(gh)) continue;
  
          let restaurants = await RestaurantsDAO.getRestaurantsByGeoHash(gh);
          closebyRestaurants.push(...restaurants);
          processedGeohashes.add(gh);
  
          // Get neighbors of this geohash
          const neighboursObj = Geohash.neighbours(gh);
          const neighboursArr = Object.keys(neighboursObj).map(n => neighboursObj[n]);
          neighboursArr.forEach(n => {
            if (!processedGeohashes.has(n)) {
              nextGeohashes.add(n);
            }
          });
        }
  
        geohashesToCheck = nextGeohashes;
        await fetchRestaurants();
      }
    
      await fetchRestaurants();
    
      // Pagination
      const startIndex = restaurantsPerPage * page;
      const paginatedRestaurants = closebyRestaurants.slice(startIndex, startIndex + restaurantsPerPage);
    
      res.json(paginatedRestaurants);
    } catch (e) {
      console.log(`api, ${e}`);
      res.status(500).json({ error: e });
    }
  }
  
  // without using set //checks the same one multiple times
  // static async apiGetPostRestaurantByLocation(req, res, next) {
  //   try {
  //     let latitude = req.body.latitude;
  //     let longitude = req.body.longitude;
  //     const restaurantsPerPage = req.body.restaurantsPerPage ? parseInt(req.body.restaurantsPerPage, 10) : 20;
  //     const page = req.body.page ? parseInt(req.body.page, 10) : 0;
  //     const geoHash = Geohash.encode(Number(latitude), Number(longitude), 7);
  //     let depth = 0;

  //     let closebyRestaurants = [];
  //     let geohashesToCheck = [geoHash];
  
  //     async function fetchRestaurants(geohashes) {
  //       if (geohashes.length === 0 || closebyRestaurants.length > restaurantsPerPage * (page + 1) || depth == 20) {
  //         return;
  //       }
  //       depth += 1;
  
  //       let nextGeohashes = [];
  //       for (let gh of geohashes) {
  //         let restaurants = await RestaurantsDAO.getRestaurantsByGeoHash(gh);
  //         closebyRestaurants.push(...restaurants);
  
  //         // Get neighbors of this geohash
  //         const neighboursObj = Geohash.neighbours(gh);
  //         const neighboursArr = Object.keys(neighboursObj).map(n => neighboursObj[n]);
  //         nextGeohashes.push(...neighboursArr);
  //       }
  
  //       await fetchRestaurants(nextGeohashes);
  //     }
  
  //     await fetchRestaurants(geohashesToCheck);
  
  //     // Pagination: Calculate the offset and limit the results
  //     const startIndex = restaurantsPerPage * page;
  //     const paginatedRestaurants = closebyRestaurants.slice(startIndex, startIndex + restaurantsPerPage);
  
  //     res.json(paginatedRestaurants);
  //   } catch (e) {
  //     console.log(`api, ${e}`);
  //     res.status(500).json({ error: e });
  //   }
  // }
  


}
