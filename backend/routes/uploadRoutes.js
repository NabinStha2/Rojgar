const express = require("express");
const multer = require("multer");
const path = require("path");

const router = express.Router();

var storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../frontend/src/uploads/");
    // cb(null, "../uploads/");
  },
  filename: (req, file, cb) => {
    console.log(file);
    cb(
      null,
      `${file.fieldname}-rojgarImage-${Date.now()}${path.extname(file.originalname)}`
      // file.originalname
    );
  },
});

// function checkFileType(file, cb) {
//   const filetypes = /jpg|jpeg|png/;
//   const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
//   const mimetype = filetypes.test(file.mimetype);

//   if (extname && mimetype) {
//     return cb(null, true);
//   } else {
//     cb("Images only");
//   }
// }

const upload = multer({
  storage: storage,
  // fileFilter: (req, file, cb) => {
  //   checkFileType(file, cb);
  // },
});

// router.post("/", upload.single("image"), (req, res) => {
//   console.log(req.file.originalname, req.file.path);
//   res.send(`${req.file.originalname}`);
// });

module.exports = upload;
