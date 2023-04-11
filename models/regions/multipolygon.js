const mongoose = require("mongoose")
const GeoMultiPolygonSchema = require("../schemas/multipolygon.schema")
const Demoregion = require("./index")

const MultiPolygonRegionSchema = new mongoose.Schema({
  geometry: GeoMultiPolygonSchema
})

MultiPolygonRegionSchema.set("timestamps", true)
MultiPolygonRegionSchema.set("toJSON", { virtuals: true })
MultiPolygonRegionSchema.set("toObject", { virtuals: true })

// create indexing(2d)for geometry field
MultiPolygonRegionSchema.index({ geometry: "2dsphere" })

// eslint-disable-next-line prefer-arrow-callback
MultiPolygonRegionSchema.post("validate", function (error, doc, next) {
  if (error?.errors["geometry.coordinates.0"].name === "CastError") {
    return next(new Error("Coordinates must be specified as a numeric array of length 2"))
  }
  return next(error)
})
// eslint-disable-next-line prefer-arrow-callback
MultiPolygonRegionSchema.post("save", function (error, doc, next) {
  // console.log("11111111111 ==> ", error.name)
  if (error.name === "MongoServerError") {
    return next(new Error("Invalid Multipolygon Data"))
  }
  return next(error)
})

module.exports = Demoregion.discriminator("MultiPolygonRegion", MultiPolygonRegionSchema, "Multipolygon")
