const mongoose = require("mongoose")
const GeoMultiPolygonSchema = require("../schemas/multipolygon.schema")
const Demoregion = require("./index")

const MultiPolygonRegionSchema = new mongoose.Schema({
  geometry: GeoMultiPolygonSchema
})

MultiPolygonRegionSchema.set("timestamps", true)
MultiPolygonRegionSchema.set("toJSON", { virtuals: true })
MultiPolygonRegionSchema.set("toObject", { virtuals: true })

MultiPolygonRegionSchema.index({ geometry: "2dsphere" })

module.exports = Demoregion.discriminator("MultiPolygonRegion", MultiPolygonRegionSchema, "Multipolygon")
