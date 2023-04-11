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
  async get(req, res) {
    const { long, lat } = req.query
    try {
      const point = {
        type: "Point",
        coordinates: [parseFloat(long), parseFloat(lat)],
      }
      const regionData = await Region.find({
        geometry: {
          $geoIntersects: {
            $geometry: point
          },
        },
      }).exec()
      return res.status(200).json({ success: true, msg: "Point to Region", data: regionData })
    } catch (error) {
      // console.error(error)
      return res.status(500).json({ message: "Server error" })
    }
  }
}
