const multer = require("multer")

const upload = multer({
  storage: multer.diskStorage({
    destination(req, file, cb) {
      // cb(null, `public/uploads/${file.fieldname}`)
      cb(null, `public/uploads/123`)
    },
    filename(req, file, cb) {
      // cb(null, `${Date.now()}-${file.originalname}`)
      cb(null, `123`)
    }
  })
})

module.exports = upload
