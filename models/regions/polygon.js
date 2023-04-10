const mongoose = require("mongoose")
const GeoPolygonSchema = require("../schemas/polygon.schema")
const Demoregion = require("./index")

const PolygonRegionSchema = new mongoose.Schema({
  geometry: GeoPolygonSchema
})

PolygonRegionSchema.set("timestamps", true)
PolygonRegionSchema.set("toJSON", { virtuals: true })
GeoPolygonSchema.set("toObject", { virtuals: true })

PolygonRegionSchema.index({ geometry: "2dsphere" })

module.exports = Demoregion.discriminator("PolygonRegion", PolygonRegionSchema, "Polygon")
