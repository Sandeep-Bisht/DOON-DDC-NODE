const cors = require("cors");
const express = require("express");
const fs = require("fs");
const router = express.Router();
const multer = require("multer");

router.use(cors({ origin: true }));

// Code for images
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadPath = "./public/uploads/";
    // Check if the uploads folder exists, create it if it doesn't
    if (!fs.existsSync(uploadPath)) {
      fs.mkdirSync(uploadPath, { recursive: true });
    }
    cb(null, uploadPath);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + file.originalname);
  },
});

const fileFilter = function (req, file, cb) {
  const allowedMimeTypes = ["image/jpeg", "image/png"];
  if (allowedMimeTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type: Only JPEG and PNG files are allowed"), false);
  }
};

var upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: { fieldSize: 2 * 1024 * 1024 }, // Limit the file size to 2MB
});

module.exports = upload;
