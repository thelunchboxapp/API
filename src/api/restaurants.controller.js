import RestaurantsDAO from "../dao/restaurantsDAO.js";

export default class RestaurantsController {
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
}
