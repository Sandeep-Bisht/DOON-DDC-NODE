const blogController = require('./blogController')
const router = require("express").Router();
const upload = require('../multer')

router.post("/add_blog",upload.array('image',10), blogController.createBlog);
router.get("/find_all_blog", blogController.getAllBlogs);
router.delete("/delete_blogById", blogController.deleteBlogById);
router.post("/get_blog_by_slug", blogController.getBlogBySlug)


module.exports = router;