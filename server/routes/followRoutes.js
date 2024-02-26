const express=require("express")
const { sendFollowRequest, acceptFollowRequest, rejectFollowRequest, getFollowers, getFollowing } = require("../controllers/followController")


const router=express.Router()

router.route("/sendfollowreq/:requester_id/:receiver_id").post(sendFollowRequest)
router.route("/acceptfollowreq/:requester_id/:receiver_id").post(acceptFollowRequest)
router.route("/rejectfollowreq/:requester_id/:receiver_id").post(rejectFollowRequest)
router.route("/getfollowers/:user_id").get(getFollowers)
router.route("/getfollowing/:user_id").get(getFollowing)


module.exports=router