const multer = require("multer")

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      cb(null, `public/uploads/${file.fieldname}`)
    },
    filename(req, file, cb) {
      cb(null, `${Date.now()}-${file.originalname}`)
    }
  }),
  fileFilter(req, file, cb) {
    if (!file.originalname.match(/\.(shp)$/)) {
      req.fileValidationError = "Only shp file type are allowed!"
      return cb(new Error("Only shp file type  are allowed!"), false)
    }
    return cb(null, true)
    // if (file.mimetype === 'application/octet-stream') {
    //   cb(null, true)
    // } else {
    //   cb(new Error('Only .shp files are allowed!'), false);
    // }
  }

})

module.exports = upload
