const app = require('express');
const router = app.Router();
const {createPost,fetchPosts,fetchPost,updatePost,updateValidations,updateImage,deletePost,home,postDetails,postComment} = require('../controllers/postController');
const auth = require('../utils/auth');

/******Routes******/
router.post("/create_post",auth, createPost);
router.get("/posts/:id/:page",auth,fetchPosts);
router.get("/post/:id/",auth,fetchPost);
router.post("/update",[auth,updateValidations], updatePost);
router.post("/updateImage",auth, updateImage);
router.get('/delete/:id', auth, deletePost);
router.get('/home/:page', home);
router.get('/explore/:id', postDetails);
router.post('/comment', auth, postComment);
module.exports = router;