const mongoose = require("mongoose")
const PolygonSchema = require("./schemas/polygon.schema")

const RegionSchema = new mongoose.Schema({

  AFFGEOID: String,

  ALAND: Number,

  AWATER: Number,

  GEOID: String,

  LSAD: String,

  NAME: String,

  STATEFP: String,

  STATENS: String,

  STUSPS: String,

  category: String,

  boundaries: PolygonSchema

})

RegionSchema.set("timestamps", true)
RegionSchema.set("toJSON", { virtuals: true })
RegionSchema.set("toObject", { virtuals: true })

module.exports = mongoose.model("Region", RegionSchema)
