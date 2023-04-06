const mongoose = require("mongoose")

const multiPolygonSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["MultiPolygon"],
    required: true
  },
  coordinates: {
    type: [[[[Number]]]],
    required: true
  }
})
module.exports = multiPolygonSchema
