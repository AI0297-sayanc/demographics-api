const mongoose = require("mongoose")
const GeoPolygonSchema = require("../schemas/polygon.schema")
const Demoregion = require("./index")

const PolygonRegionSchema = new mongoose.Schema({
  geometry: GeoPolygonSchema
})

PolygonRegionSchema.set("timestamps", true)
PolygonRegionSchema.set("toJSON", { virtuals: true })
GeoPolygonSchema.set("toObject", { virtuals: true })

// create indexing(2d)for geometry field
PolygonRegionSchema.index({ geometry: "2dsphere" })

// eslint-disable-next-line prefer-arrow-callback
PolygonRegionSchema.post("validate", function (error, doc, next) {
  if (error?.errors["geometry.coordinates.0"].name === "CastError") {
    return next(new Error("Coordinates must be specified as a numeric array of length 2"))
  }
  return next(error)
})
// eslint-disable-next-line prefer-arrow-callback
PolygonRegionSchema.post("save", function (error, doc, next) {
  // console.log("11111111111 ==> ", error.name)
  if (error.name === "MongoServerError") {
    return next(new Error("Invalid Polygon Data"))
  }
  return next(error)
})

module.exports = Demoregion.discriminator("PolygonRegion", PolygonRegionSchema, "Polygon")
