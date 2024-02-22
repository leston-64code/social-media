const express=require("express")
const { loginUser, signUpUser } = require("../controllers/authController")


const router=express.Router()

router.route("/signup").post(signUpUser)
router.route("/login").post(loginUser)

module.exports=router



