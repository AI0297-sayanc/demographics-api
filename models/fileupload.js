const mongoose = require("mongoose")

const fileuploadSchema = new mongoose.Schema({
  rdoc: { type: String, required: true }
})

// Model

module.exports = mongoose.model("fileupload", fileuploadSchema)
