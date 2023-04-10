const mongoose = require("mongoose")
const multiPolygonSchema = require("../schemas/multipolygon.schema")
const Demoregion = require("./index")

const MultiPolygonSchema = new mongoose.Schema({
  geometry: multiPolygonSchema
})

MultiPolygonSchema.set("timestamps", true)
MultiPolygonSchema.set("toJSON", { virtuals: true })
MultiPolygonSchema.set("toObject", { virtuals: true })

module.exports = Demoregion.discriminator("MultipolygonRegion", MultiPolygonSchema, "Multipolygon")
