const Region = require("../models/regions")

module.exports = {
  async get(req, res) {
    const { geoid } = req.params
    try {
      const zipcode = await Region.findOne({
        geoId: geoid,
        geographicLevel: "Zipcode"

      }).exec()
      if (zipcode === null) return res.status(400).json({ error: true, message: `No such Zipcode with geo id ${geoid}` })

      const regionsWithinZipcode = await Region.find({

        geographicLevel: {
          $in: [
            "Tract", "Block Group", "Blocks"
          ]

        },
        centroid: {
          $geoWithin: {
            $geometry: zipcode.geometry
          }
        }
      }).exec()
      return res.status(200).json({ error: false, regions: regionsWithinZipcode })
    } catch (error) {
      console.log("error ==> ", error)

      return res.status(500).json({ error: true, message: error.message })
    }
  }

}
