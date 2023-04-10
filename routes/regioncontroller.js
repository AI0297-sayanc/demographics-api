// const Regions = require("../models/demoregions")
// const Demoregion = require("../models/regions/index")
const MultipolygonRegion = require("../models/regions/multipolygon")
const PolygonRegion = require("../models/regions/polygon")

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
      return res.status(500).json({ message: error })
    }
  }

}
