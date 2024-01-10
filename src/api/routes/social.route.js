import express from 'express';
import SocialCtrl from '../social.controller.js';


const router = express.Router();

router.route("/followers/:user_uid").get(SocialCtrl.apiGetFollowers);
router.route("/following/:user_uid").get(SocialCtrl.apiGetFollowing);
router.route("/connections/:user_uid").get(SocialCtrl.apiGetConnections);

router.route("/follow").post(SocialCtrl.apiFollowUser);
router.route("/unfollow").delete(SocialCtrl.apiUnfollowUser);
router.route("/isfollowing").get(SocialCtrl.apiIsFollowing);

export default router;