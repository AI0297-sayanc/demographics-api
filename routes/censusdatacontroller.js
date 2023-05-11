const Census = require("../models/census")

module.exports = {
  async get(req, res) {
    const { geoid } = req.params
    console.log(geoid)
    try {
      const allCensusData = await Census.findOne({
        geoId: geoid
      })

      if (!allCensusData) {
        return res.status(404).send("Census data not found")
      }
      return res.status(200).json({ success: true, msg: "Census data for a given geoid", data: allCensusData })
    } catch {
      return res.status(500).json({ message: "Server error" })
    }
  }
}
