const multer = require('multer')
const path = require('path')

const storage = multer.diskStorage({
    destination: function (req, file, callback) {
      return callback(null, 'uploads/products')
    },
    
    filename: function (req, file, callback) {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      const extname = path.extname(file.originalname)
      return callback(null, file.fieldname + '-' + uniqueSuffix + extname)
    }
  })
  
  const upload = multer({
         storage,
      limits : {fileSize : 10000000},
      fileFilter : (req, file, callback) => {
          let fileType = ['image/jpeg', 'image/jpg', 'image/png']
          if(!fileType.includes(file.mimetype)){
             return callback(
                  new Error('File type is not supported, please upload a .jpg, .jpeg or a .png extension file')
              )
          }
          return callback(null, true)
      }
    })

  module.exports = upload