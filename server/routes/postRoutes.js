const express=require("express")
const { createPost, updatePost, deletePost, getOnePost, getAllPostsOfOneUser, likePost } = require("../controllers/postController")


const router=express.Router()

router.route("/create/:user_id").post(createPost)
router.route("/update/:user_id/:post_id").post(updatePost)
router.route("/delete/:userId/:postId").delete(deletePost)
router.route("/getOne/:post_id").get(getOnePost)
router.route("/getall/:user_id").get(getAllPostsOfOneUser)

router.route("/likepost/:user_id/:post_id").post(likePost)

router.route("/createcomment/:user_id/:post_id").post(likePost)
router.route("/deletecomment/:user_id/:comment_id").delete(likePost)
router.route("/getallcomments/:post_id").get(likePost)

module.exports=router