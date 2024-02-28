const express=require("express")
const { createPost, updatePost, deletePost, getOnePost, getAllPostsOfOneUser, likePost, commentOnPost, deleteComment, getAllCommentsOnAPost } = require("../controllers/postController")
const upload = require("../middlewares/multerService")


const router=express.Router()

router.route("/create/:user_id").post(upload.single("image"),createPost)
router.route("/update/:user_id/:post_id").post(updatePost)
router.route("/delete/:user_id/:post_id").delete(deletePost)
router.route("/getOne/:post_id").get(getOnePost)
router.route("/getall/:user_id").get(getAllPostsOfOneUser)

router.route("/likepost/:user_id/:post_id").post(likePost)

router.route("/createcomment/:user_id/:post_id").post(commentOnPost)
router.route("/deletecomment/:user_id/:comment_id").delete(deleteComment)
router.route("/getallcomments/:post_id").get(getAllCommentsOnAPost)

module.exports=router