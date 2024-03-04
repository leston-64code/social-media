const express=require("express")
const { getUsers } = require("../controllers/searchController")

const router=express.Router()

router.route("/getusers").post(getUsers)

module.exports=router



