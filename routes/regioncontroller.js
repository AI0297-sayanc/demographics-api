const Region = require("../models/regions")
const MultipolygonRegion = require("../models/regions/multipolygon")
const PolygonRegion = require("../models/regions/polygon")
const PointRegion = require("../models/regions/point")

module.exports = {
  async post(req, res) {
    const {
      geoId, name,
      geographicLevel, geometry, centroid, state, county, tract, blockGroup
    } = req.body
    try {
      let posData = {}
      if (geometry.type === "MultiPolygon") {
        posData = await MultipolygonRegion.create({
          geoId,
          name,
          geographicLevel,
          geometry,
          centroid,
          state,
          county,
          tract,
          blockGroup
        })
      }
      if (geometry.type === "Polygon") {
        posData = await PolygonRegion.create({
          geoId,
          name,
          geographicLevel,
          geometry,
          centroid,
          state,
          county,
          tract,
          blockGroup
        })
      }
      if (geometry.type === "Point") {
        posData = await PointRegion.create({
          geoId,
          name,
          geographicLevel,
          geometry,
          state,
          county,
          tract,
          blockGroup
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
    const { long, lat, rad } = req.query
    // console.log("req.query ==> ", req.query)
    try {
      const regionData = await Region.find(
        {
          geometry: {
            $nearSphere: {
              $geometry: { type: "Point", coordinates: [Number(long), Number(lat)] },
              $maxDistance: Number(rad),
            }
          }
        },
      ).exec()
      // console.log("demoData ==> ", regionData)
      return res.status(200).json({ success: true, msg: "All data for given radius", data: regionData })
    } catch (error) {
      // console.log("error ==> ", error)
      return res.status(500).json({ message: "Server error" })
    }
  }

}
