const mongoose = require("mongoose")
const PointSchema = require("./schemas/point.schema")

const DemographicsSchema = new mongoose.Schema({

  stateCode: Number,
  countryCode: Number,
  censusTractCode: Number,
  blockGroupCode: Number,
  blockCode: Number,
  renterOccupied: Number,
  ownerOccupied: Number,
  totalPopulation: Number,
  CENTLAT: Number,
  CENTLON: Number,
  location: PointSchema
})

DemographicsSchema.set("timestamps", true)
DemographicsSchema.set("toJSON", { virtuals: true })
DemographicsSchema.set("toObject", { virtuals: true })

module.exports = mongoose.model("Demographics", DemographicsSchema)
