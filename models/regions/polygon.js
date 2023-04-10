const mongoose = require("mongoose")
const polygonSchema = require("../schemas/polygon.schema")
const Demoregion = require("./index")

const PolygonRegionSchema = new mongoose.Schema({
  geometry: polygonSchema
})

PolygonRegionSchema.set("timestamps", true)
PolygonRegionSchema.set("toJSON", { virtuals: true })
PolygonRegionSchema.set("toObject", { virtuals: true })

module.exports = Demoregion.discriminator("PolygonRegion", PolygonRegionSchema, "Polygon")
