const Region = require("../models/regions")

module.exports = {
  async get(req, res) {
    const { geoid } = req.params
    // console.log("geoid ==> ", geoid)
    try {
      const msa = await Region.findOne({
        geoId: geoid,
        geographicLevel: "MSA"
      }).exec()
      // console.log("msa ==> ", msa)
      if (msa === null) return res.status(400).json({ error: true, message: `No such MSA with geo id ${geoid}` })

      const regionsWithinMsa = await Region.find({
        geographicLevel: {
          $in: [
            "Tract", "Block Group", "Blocks"
          ]
        },
        centroid: {
          $geoWithin: {
            $geometry: msa.geometry
          }
        }
      }).exec()
      // console.log(" regionsWithinMsa==> ", regionsWithinMsa)
      return res.status(200).json({ error: false, regions: regionsWithinMsa })
    } catch (error) {
      // console.log("error ==> ", error)
      return res.status(500).json({ error: true, message: error.message })
    }
  }

}
