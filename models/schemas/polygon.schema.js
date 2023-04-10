const mongoose = require("mongoose")
const Tuple = require("./tuple.class")
mongoose.Schema.Types.Tuple = Tuple

const polygonSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Polygon"],
    required: true
  },
  coordinates: {
    type: [[Tuple]],
    required: true,
  }
})

module.exports = polygonSchema
