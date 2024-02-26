const express=require("express")
const { updateUserBio, addUserBio, getUserProfile, uploadProfilePicture, removeProfilePicture } = require("../controllers/profileController")


const router=express.Router()

router.route("/uploadprofilepicture/:user_id").post(uploadProfilePicture)
router.route("/removeprofilepicture/:user_id").put(removeProfilePicture)
router.route("/getprofile/:user_id").get(getUserProfile)
router.route("/addbio/:user_id").post(addUserBio)
router.route("/updatebio/:user_id").put(updateUserBio)


module.exports=router