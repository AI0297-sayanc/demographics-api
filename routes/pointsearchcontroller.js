const Region = require("../models/regions")

module.exports = {
  async get(req, res) {
    const { long, lat } = req.query
    try {
      const searchPoint = {
        type: "Point",
        coordinates: [Number(long), Number(lat)],
      }
      // console.log(searchPoint)

      const searchRegionData = await Region.find({
        geometry: {
          $geoIntersects: {
            $geometry: searchPoint
          },
        },
      }).exec()

      console.log(searchRegionData)
      return res.status(200).json({ results: searchRegionData })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: "Server error" })
    }
  }
}
