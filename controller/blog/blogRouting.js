const blogController = require('./blogController')
const router = require("express").Router();
const upload = require('../multer')

router.post("/add_blog",upload.array('image',10), blogController.createBlog);
router.get("/find_all_blog", blogController.getAllBlogs)


module.exports = router;