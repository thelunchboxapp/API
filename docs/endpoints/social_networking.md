# Social Networking API Endpoints

## 1. Follow a User
- **Endpoint**: `POST /api/follow`
- **Description**: Allows a user to follow another user.
- **Payload**: `follower_uid` (ID of the user who is following), `following_uid` (ID of the user to be followed).
- **Example**: http://localhost:5000/api/v1/social/follow
    - ```
            {
            "follower_uid": "2",
            "following_uid": "3"
            }
        ```
    
- **Functionality**: Inserts a new record in the `follows` table.

## 2. Unfollow a User
- **Endpoint**: `DELETE /api/unfollow`
- **Description**: Allows a user to unfollow another user they are currently following.
- **Payload**: `follower_uid`, `following_uid`.
- **Example**: http://localhost:5000/api/v1/social/unfollow
    - ```
            {
            "follower_uid": "2",
            "following_uid": "3"
            }
        ```
- **Functionality**: Deletes the relevant record from the `follows` table.
## 3. List of Followers
- **Endpoint**: `GET /api/followers/:user_id`
- **Description**: Retrieves a list of all users who follow the specified user.
- **Parameters**: `user_id` (ID of the user whose followers are to be listed).
- **Example**: http://localhost:5000/api/v1/social/followers/2
- **Functionality**: Selects records from the `follows` table where `following_id` matches the given `user_id`.

## 4. List of Followings
- **Endpoint**: `GET /api/following:user_id/`
- **Description**: Retrieves a list of all users that the specified user is following.
- **Parameters**: `user_id`.
- **Example**: http://localhost:5000/api/v1/social/following/2
- **Functionality**: Selects records where `follower_id` matches the given `user_id`.

## 5. List of Mutual Follows (Connections)
- **Endpoint**: `GET /api/connections:user_id/`
- **Description**: Gets a list of mutual follows (i.e., connections or friends) for the specified user.
- **Parameters**: `user_id`.
- **Example**: http://localhost:5000/api/v1/social/connections/2
- **Functionality**: Performs a join on the `follows` table to find mutual follow relationships.

## 6. Check if User is Following Another User
- **Endpoint**: `GET /api/isfollowing`
- **Description**: Checks if one user is following another.
- **Payload**: `follower_id`, `following_id`.
- Example: http://localhost:5000/api/v1/social/isfollowing
    - ```
            {
            "follower_id": "2",
            "following_id": "3"
            }
        ```
- **Functionality**: Looks up the `follows` table for a record matching both IDs.

---

### Notes on Security and Functionality:

- **Authentication**: All these endpoints should require user authentication. Ensure that actions are performed by authenticated users and that users can only make changes related to their accounts (e.g., a user can only follow/unfollow from their account).
- **Validation**: Include necessary validation checks (e.g., a user should not be able to follow themselves; checks for existing follow records before inserting a new one).
- **Error Handling**: Implement proper error handling for scenarios like trying to follow a non-existing user, unfollowing a user not being followed, etc.
- **Pagination**: For endpoints that can return large datasets (like lists of followers/following), consider implementing pagination to limit the amount of data returned in a single request.