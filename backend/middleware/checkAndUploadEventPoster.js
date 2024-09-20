const multer = require("multer");
const path = require("path");
const fs = require("fs");
const allowedMimeTypes = ["image/webp"];

const MAX_SIZE = 1048576; // 1MB

// Multer storage config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/event_posters");
  },
  filename: function (req, file, cb) {
    const filename = `${Date.now()}-${file.originalname}`;
    cb(null, filename);
  }
});

// Multer file filter config
const upload = multer({
  storage: storage,
  limits: { fileSize: MAX_SIZE },
  fileFilter: function (req, file, cb) {
    if (!allowedMimeTypes.includes(file.mimetype)) {
      return cb(
        new Error("Invalid file format. Only WEBP format is allowed.")
      );
    }
    cb(null, true);
  }
}).single("event_poster");

// Middleware to handle file upload and validation
function checkAndUploadEventPoster(req, res, next) {
  upload(req, res, (err) => {
    if (err) {
      return res.status(400).json({
        error: true,
        msg: err.message,
      });
    }

    // Check if file is present
    if (!req.file) {
      return res.status(400).json({
        error: true,
        msg: "Event Poster file missing.",
      });
    }

    // If all checks pass, proceed to the next middleware or route handler
    req.body.event_poster = req.file.filename;
    next();
  });
}

module.exports = checkAndUploadEventPoster;
