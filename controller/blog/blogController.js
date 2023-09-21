const connection = require("../../connection");
const fs = require("fs");

module.exports = {
  createBlog: async (req, res) => {
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
        const values = [
          title,
          description,
          JSON.stringify(imageObject),
          content,
          slug,
        ];
        connection.query(insertSql, values, async (error, result) => {
          if (error) {
            console.error(error);
            return res.status(500).send("Error inserting blog");
          }
          res.status(200).send("Blog added to database");
        });
      });
    }
  },
  getAllBlogs: async (req, res) => {
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

      res.status(200).json(blogs);
    });
  },
  deleteBlogById: async (req, res) => {
    const { id } = req.body;
    const deleteQuery = `DELETE FROM blog WHERE id = ${id}`;
    connection.query(deleteQuery, (error, result) => {
      if (error) {
        console.error(error);
        return res.status(500).send("Error in deleting blogs");
      }
      res.status(200).json({
        data: result,
        message: "Blog deleted successfully",
      });
    });
  },
  getBlogBySlug: async (req, res) => {
    const  payload  = req.body;
    console.log("inside get Blog by slug", payload.slug);
    // SQL query to retrieve data by slug
    const query = "SELECT * FROM blog WHERE slug = ?";
    connection.query(query, [payload.slug], (error, results) => {
      if (error) {
        console.error("Error executing query:", error);
        res.status(500).json({ error: "Internal Server Error" });
        return;
      }
      if (results.length === 0) {
        console.log(results,"check result")
        res.status(404).json({ error: "Not Found" });
      } else {
        const post = results[0];
        res.json(post);
      }
    });
  },
};
