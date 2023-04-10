const mongoose = require("mongoose")

const DemoregionsSchema = new mongoose.Schema({
  geoId: String,
  name: String,
  geographicLevel: {
    type: String,
    enum: ["Country", "State", "County", "Tract", "Block Group", "Blocks", "Places", "MSA", "Zipcode"]
  },
  _censusdata: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Census",
  },
})
// Create 2dsphere index for location field
DemoregionsSchema.index({ location: "2dsphere" })

DemoregionsSchema.set("timestamps", true)
DemoregionsSchema.set("toJSON", { virtuals: true })
DemoregionsSchema.set("toObject", { virtuals: true })
DemoregionsSchema.set("discrimanorKey", "geometry.type")

module.exports = mongoose.model("Demoregion", DemoregionsSchema)
