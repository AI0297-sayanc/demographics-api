// const Regions = require("../models/demoregions")
// const Demoregion = require("../models/regions/index")
const Region = require("../models/regions")
const MultipolygonRegion = require("../models/regions/multipolygon")
const PolygonRegion = require("../models/regions/polygon")
const PointRegion = require("../models/regions/point")

module.exports = {
  async post(req, res) {
    const {
      geoId, name,
      geographicLevel, geometry

    } = req.body
    try {
      let posData = {}
      if (geometry.type === "MultiPolygon") {
        posData = await MultipolygonRegion.create({
          geoId,
          name,
          geographicLevel,
          geometry
        })
      }
      if (geometry.type === "Polygon") {
        posData = await PolygonRegion.create({
          geoId,
          name,
          geographicLevel,
          geometry
        })
      }
      if (geometry.type === "Point") {
        posData = await PointRegion.create({
          geoId,
          name,
          geographicLevel,
          geometry
        })
      }
      // const posData = await Demoregion.create({
      //   geoId,
      //   name,
      //   geographicLevel,
      //   geometry
      // }).exec()
      // posData = posData.toObject()
      return res.status(200).json({
        success: true,
        msg: "Name of Regions",
        data: posData,
      })
    } catch (error) {
      console.log("error ==> ", error)
      return res.status(500).json({ message: error.message })
    }
  },
  // get region by id...........
  async  get(req, res) {
    // const { id } = req.params
    // console.log(id)
    try {
      // const region = await Region.findOne({ _id: id }).exec()
      // console.log(region)
      const data = await Region.find({}).exec()
      return res.status(200).json({ success: true, msg: "All Region data", data })
    } catch (error) {
      // console.log("error ==> ", error)
      return res.status(500).json({ message: "server error" })
    }
  }
}
