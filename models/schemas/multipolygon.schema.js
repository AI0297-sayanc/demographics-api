const mongoose = require("mongoose")
const Tuple = require("./tuple.class")
mongoose.Schema.Types.Tuple = Tuple

const multiPolygonSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["MultiPolygon"],
    required: true
  },
  coordinates: {
    type: [[[Tuple]]],
    required: true
  }
})
module.exports = multiPolygonSchema
