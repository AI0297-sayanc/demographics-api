const Region = require("../models/regions")

module.exports = {
  async get(req, res) {
    try {
      const allMsa = await Region.find({
        geographicLevel: "MSA"
      })

      return res.status(200).json({ success: true, msg: "All MSA(s)", data: allMsa })
    } catch (error) {
      return res.status(500).json({ message: "Server error" })
    }
  }
}
