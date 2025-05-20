// Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.

// Multer helps your server understand and grab the file when a user uploads it
import multer from "multer"
const storage = multer.diskStorage({
  
  destination: function (req, file, cb) {
    cb(null, './public/temp/'); // Ensure this folder exists or create it
  },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  const upload = multer({ 
    storage,
})

  export default upload;