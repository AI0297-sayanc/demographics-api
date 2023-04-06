const mongoose = require("mongoose")
// const { Schema } = mongoose

const polygonSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["Polygon"],
    required: true
  },
  coordinates: {
    type: [[[Number]]],
    required: true
  }
})

module.exports = polygonSchema
