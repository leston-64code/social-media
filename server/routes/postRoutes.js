const express=require("express")
const { createPost, updatePost, deletePost, getOnePost, getAllPostsOfOneUser, likePost } = require("../controllers/postController")


const router=express.Router()

router.route("/create").post(createPost)
router.route("/update").post(updatePost)
router.route("/delete/:userId/:postId").delete(deletePost)
router.route("/getOne").get(getOnePost)
router.route("/getall").get(getAllPostsOfOneUser)

router.route("/likepost").post(likePost)

router.route("/createcomment").post(likePost)
router.route("/deletecomment").delete(likePost)
router.route("/getallcomments").get(likePost)

module.exports=router