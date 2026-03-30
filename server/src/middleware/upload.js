const multer = require('multer');

// Configure multer for memory storage
const storage = multer.memoryStorage();

const upload = multer({
  storage: storage,
  limits: {
    fileSize: 10 * 1024 * 1024, // 10MB limit per file
    files: 15, // Maximum 15 files
  },
  fileFilter: function (req, file, cb) {
    // Accept all file types
    cb(null, true);
  },
});

// Middleware for handling multiple files
const uploadMiddleware = upload.array('files', 15);

module.exports = uploadMiddleware;