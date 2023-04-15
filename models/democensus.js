const mongoose = require("mongoose")
// const { Schema } = mongoose

const DemoCensusSchema = new mongoose.Schema({
  geoId: {
    type: String,
    unique: true
  },
  name: String,
  attributes: {
    B01001_E001: { type: String },
    B01001_E002: { type: String },
  },

})
module.exports = mongoose.model("Census", DemoCensusSchema)
// Schema.Types.Mixed