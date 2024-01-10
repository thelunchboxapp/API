import SocialDAO from '../dao/socialDAO.js';

export default class SocialController {
    static async apiGetFollowers(req, res, next) {
        try {
            const userUid = req.params.user_uid;
            console.log(userUid)
            const followers = await SocialDAO.getFollowers({userUid});
            res.json(followers);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiGetFollowing(req, res, next) {
        try {
            const userUid = req.params.user_uid;
            const following = await SocialDAO.getFollowing({userUid});
            res.json(following);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiGetConnections(req, res, next) {
        try {
            const userUid = req.params.user_uid;
            const connections = await SocialDAO.getConnections({userUid});
            res.json(connections);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiFollowUser(req, res, next) {
        try {
            const followerUid = req.body.follower_uid;
            const followingUid = req.body.following_uid;
            if (followerUid === followingUid) {
                throw new Error("You cannot follow yourself");
            }
            console.log(followerUid, followingUid);
            const follow = await SocialDAO.addFollow(followerUid, followingUid);
            res.json(follow);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiUnfollowUser(req, res, next) {
        try {
            const followerUid = req.body.follower_uid;
            const followingUid = req.body.following_uid;
            const unfollow = await SocialDAO.deleteFollow(followerUid, followingUid);
            res.json(unfollow);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }

    static async apiIsFollowing(req, res, next) {
        try {
            const followerUid = req.body.follower_uid;
            const followingUid = req.body.following_uid;
            const isFollowing = await SocialDAO.isFollowing(followerUid, followingUid);
            res.json(isFollowing);
        } catch (e) {
            res.status(500).json({ error: e.message });
        }
    }
}