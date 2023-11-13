const express = require('express');
const multer = require('multer');
const path = require('path');
const router = express.Router();

const app = express();
const port = 3001;

// Set up Multer storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    // Specify the destination folder for uploaded images
    cb(null, path.join(__dirname, 'static'));
  },
  filename: (req, file, cb) => {
    // Use the original file name as the new file name
    cb(null, file.originalname);
  },
});

const upload = multer({ storage: storage });

// Handle image uploads
router.post('/uploadImages/:listingId', upload.array('images'), (req, res) => {
  const listingId = req.params.listingId;
  const uploadedImages = req.files;

  // Handle the uploaded images (save paths, database updates, etc.)
  // For simplicity, we'll just log the file paths
  const imagePaths = uploadedImages.map(image => image.path);
  console.log(`Images uploaded for listing ${listingId}:`, imagePaths);

  res.status(200).send('Images uploaded successfully');
});

router.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});

module.exports = router;
