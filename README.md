Restaurants API Documentation
=============================

Welcome to the Restaurants API documentation! This API provides a comprehensive suite of functionalities for managing restaurants, reviews, wishlists, user profiles, and social interactions related to restaurant experiences. Below you will find detailed information on how to use each endpoint, including examples of requests and the expected responses.

Getting Started
---------------

To start using the Restaurants API, ensure you have the necessary authorization tokens (if required by the endpoint) and that you are sending requests to the correct base URL. The base URL for this API is `http://localhost:5000/api/v1/`.

Endpoints Overview
------------------

### Restaurants

-   Post Restaurant: Allows a user to add a restaurant.

    -   `POST /restaurant`
    -   Payload Example:

        jsonCopy code

        `{
          "name": "Deshi Grocery",
          "address": "124 Raymond Ave",
          "city": "Poughkeepsie",
          "state": "NY",
          "country": "United States",
          "postalcode": "12601",
          "pricerange": 100,
          "stars": 5,
          "cuisine": "Chinese",
          "latitude": 41.68561,
          "longitude": 73.89449
        }`

-   Update Restaurant: Allows a superuser to update a restaurant.

    -   `PUT /restaurant`
    -   Payload Example:

        jsonCopy code

        `{
          "restaurant_id": 6,
          "name": "Deshi Grocery",
          "address": "124 Raymond Ave",
          "city": "Poughkeepsie",
          "state": "NY",
          "country": "United States",
          "postalcode": "12601",
          "pricerange": 100,
          "stars": 5,
          "cuisine": "Chinese",
          "latitude": 41.68561,
          "longitude": 73.89449
        }`

-   Delete Restaurant: Allows a superuser to delete a restaurant.

    -   `DELETE /restaurant`
    -   Payload Example:

        jsonCopy code

        `{"restaurant_id": 6}`

-   Get Restaurant by Location: Gets nearby restaurants within a certain radius.

    -   `GET /restaurant/nearby`
    -   Parameters: `latitude`, `longitude`, `restaurantsPerPage`, `page`
-   Get Restaurant (filtered by name, cuisine, zipcode):

    -   `GET /restaurant`
-   Get Restaurant by restaurantID:

    -   `GET /restaurant/id/{restaurantID}`

### Reviews

-   Post Review: Allows a user to post a review for a restaurant.

    -   `POST /review`
    -   Payload Example:

        jsonCopy code

        `{
          "restaurant_id": 2,
          "user_id": 2,
          "comment": "bad",
          "price": 100,
          "rating": 5
        }`

-   Update Review: Updates an existing review.

    -   `PUT /review`
    -   Payload Example:

        jsonCopy code

        `{
          "review_id": 1,
          "user_id": "1",
          "comment": "excellent",
          "price": 200,
          "rating": 5
        }`

-   Delete Review: Deletes a specified review.

    -   `DELETE /review`
    -   Payload Example:

        jsonCopy code

        `{"review_id": 3, "user_id": "1"}`

-   Get Reviews by UserId: Retrieves all reviews made by a specific user.

    -   `GET /reviews/user/{userId}`
-   Get Reviews by Restaurant Id: Retrieves all reviews for a specific restaurant.

    -   `GET /reviews/restaurant/{restaurantId}`

### Wish Lists

-   Get Wishlists by UserId: Retrieves the wishlist of a specific user.

    -   `GET /wishlists/user/{userId}`
-   Add Wishlist: Allows a user to add a restaurant to their wishlist.

    -   `POST /wishlists`
    -   Payload Example:

        jsonCopy code

        `{
          "restaurant_id": 1,
          "user_id": 1,
          "cuisine": "Rice",
          "priority": "Very soon"
        }`

-   Update Wishlist: Updates an existing wishlist entry.

    -   `PUT /wishlists`
    -   Payload Example:

        jsonCopy code

        `{
          "wish_id": 2,
          "restaurant_id": 1,
          "user_id": "1",
          "cuisine": "Rice",
          "priority": "Another month"
        }`

-   Delete Wishlist: Deletes a specified wishlist entry.

    -   `DELETE /wishlists`
    -   Payload Example:

        jsonCopy code

        `{"wish_id": 4, "user_id": "1"}`

### Users

-   Get User: Get user details by userID.

    -   `GET /users/{userID}`
-   Post User: Registers a new user.

    -   `POST /users`
    -   Payload Example:

        jsonCopy code

        `{
          "username": "tanishwasp10",
          "name": null,
          "email": "tanishwasp10@gmail.com"
        }`

-   Update User: Updates user information.

    -   `PUT /users/{userID}`
    -   Payload Example:

        jsonCopy code

        `{
          "firebaseUid": "6",
          "username": "tanishwasp10",
          "name": null,
          "email": "tanishwasp10@gmail.com"
        }`

-   Delete User: Deletes a user.

    -   `DELETE /users/{userID}`
-   Check availability: Checks if a username or email is available.

    -   `GET /users/check-availability`
-   Search users: Searches for users by name.

    -   `GET /users/search/{firebaseUid}`

### Social

-   Get Followers: Retrieves a list of followers for a user.

    -   `GET /social/followers/{userID}`
-   Get Following: Retrieves a list of users that a user is following.

    -   `GET /social/following/{userID}`
-   Get Connections: Retrieves a list of connections (two-way following) for a user.

    -   `GET /social/connections/{userID}`
-   Follow User: Follows another user.

    -   `POST /social/follow`
    -   Payload Example:

        `{
          "follower_uid": "1",
          "following_uid": "2"
        }`

-   Unfollow User: Unfollows a user.

    -   `DELETE /social/follow`
    -   Payload Example:

        `{
          "follower_uid": "1",
          "following_uid": "2"
        }`

-   Check if user1 is following user2: Checks if one user is following another.

    -   `GET /social/isfollowing`
