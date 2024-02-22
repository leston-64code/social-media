const express=require("express")
const { updateUserBio, addUserBio, getUserProfile, uploadProfilePicture, removeProfilePicture } = require("../controllers/profileController")


const router=express.Router()

router.route("/uploadprofilepicture/:userId").post(uploadProfilePicture)
router.route("/removeprofilepicture/:userId").put(removeProfilePicture)
router.route("/getprofile/:userId").get(getUserProfile)
router.route("/addbio/:userId").post(addUserBio)
router.route("/updatebio/:userId").put(updateUserBio)


module.exports=router