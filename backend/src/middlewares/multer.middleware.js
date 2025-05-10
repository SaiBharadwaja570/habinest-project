// Multer is a node.js middleware for handling multipart/form-data, which is primarily used for uploading files.

// Multer helps your server understand and grab the file when a user uploads it
import multer from "multer"

const storage = multer.diskStorage({
    destination: function (req, file, cb) { // file -> contains files 
      cb(null, "./public/temp")
    },
    filename: function (req, file, cb) {
      cb(null, file.originalname)
    }
  })
  
  const upload = multer({ 
    storage,
})

  export default upload;