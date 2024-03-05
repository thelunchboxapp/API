import express from 'express';
import SocialCtrl from '../social.controller.js';


const router = express.Router();

router.route("/followers/:firebaseUid").get(SocialCtrl.apiGetFollowers);
router.route("/following/:firebaseUid").get(SocialCtrl.apiGetFollowing);
router.route("/connections/:firebaseUid").get(SocialCtrl.apiGetConnections);

router.route("/follow").post(SocialCtrl.apiFollowUser);
router.route("/follow").delete(SocialCtrl.apiUnfollowUser);
router.route("/isfollowing").get(SocialCtrl.apiIsFollowing);

export default router;