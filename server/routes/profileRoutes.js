const express=require("express")
const { updateUserBio, addUserBio, getUserProfile, uploadProfilePicture, removeProfilePicture, getFullUserProfile } = require("../controllers/profileController")
const upload = require("../middlewares/multerService")



const router=express.Router()

router.route("/uploadprofilepicture/:user_id").post(upload.single('file'),uploadProfilePicture)
router.route("/removeprofilepicture/:user_id").put(removeProfilePicture)
router.route("/getprofile/:user_id").get(getUserProfile)
router.route("/getfullprofile/:user_id").get(getFullUserProfile)
router.route("/addbio/:user_id").post(addUserBio)
router.route("/updatebio/:user_id").put(updateUserBio)


module.exports=router