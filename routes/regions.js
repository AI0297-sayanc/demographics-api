const Regions = require("../models/regions")

/* 1. Given a point which region it belongs to */

module.exports = {
  async get(req, res) {
    const { longitude, latitude } = req.body
    //   console.log(longitude, latitude)
    try {
      const point = {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      }
      const regionData = await Regions.find({
        boundaries: {
          $geoIntersects: {
            $geometry: point
          },
        },
      }).exec()
      // console.log(regionData)
      return res.status(200).json({ results: regionData })
    } catch (error) {
    // console.error(error)
      return res.status(500).json({ message: "Server error" })
    }
  }
}
