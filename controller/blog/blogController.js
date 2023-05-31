const connection = require("../../connection");
const fs = require('fs');

module.exports = {
    createBlog: async (req, res) => {
        console.log("inside create blog", req.body, req.files);
        const { title, description, content, slug } = req.body;
        const featuredImage = req.files[0]; // Assuming only one image file is uploaded
    
        const checkTableSql = 'SHOW TABLES LIKE "blog"';
        connection.query(checkTableSql, (error, results) => {
          if (error) {
            console.error(error);
            return res.status(500).send("Error checking for table existence");
          }
          if (results.length === 0) {
            const createTableSql =
              "CREATE TABLE blog (id INT NOT NULL AUTO_INCREMENT, title VARCHAR(50) NOT NULL, description VARCHAR(200), content VARCHAR(500), slug VARCHAR(50), featuredImage JSON, PRIMARY KEY (id))";
            connection.query(createTableSql, (error) => {
              if (error) {
                console.error(error);
                return res.status(500).send("Error creating table");
              }
              console.log("blog table created!");
              insertData();
            });
          } else {
            insertData();
          }
        });
    
        function insertData() {
          // Read the image file
          fs.readFile(featuredImage.path, (error, data) => {
            if (error) {
              console.error(error);
              return res.status(500).send("Error reading image file");
            }
    
            const imageObject = {
              fieldname: featuredImage.fieldname,
              originalname: featuredImage.originalname,
              encoding: featuredImage.encoding,
              mimetype: featuredImage.mimetype,
              destination: featuredImage.destination,
              filename: featuredImage.filename,
              path: featuredImage.path,
              size: featuredImage.size,
            };
    
            const insertSql =
              "INSERT INTO blog (title, description, featuredImage, content, slug) VALUES (?,?,?,?,?)";
            const values = [title, description, JSON.stringify(imageObject), content, slug];
            connection.query(insertSql, values, async (error, result) => {
              if (error) {
                console.error(error);
                return res.status(500).send("Error inserting blog");
              }
              console.log("blog added to database!");
              res.status(200).send("Blog added to database");
            });
          });
        }
      },
      getAllBlogs: async (req, res) => {
        console.log("insid e all bligs")
        const selectSql = "SELECT * FROM blog";
        connection.query(selectSql, (error, results) => {
          if (error) {
            console.error(error);
            return res.status(500).send("Error retrieving blogs");
          }
          
          // Parse the featuredImage JSON string back into an object
          const blogs = results.map((blog) => {
            const parsedImage = JSON.parse(blog.featuredImage);
            return {
              ...blog,
              featuredImage: parsedImage,
            };
          });
      
          console.log("Blogs retrieved successfully");
          res.status(200).json(blogs);
        });
      },
      
};
