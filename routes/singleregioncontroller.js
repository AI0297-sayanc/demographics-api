const Region = require("../models/regions")

module.exports = {
  async get(req, res) {
    const { id } = req.params
    try {
      const regionData = await Region.findOne({
        _id: id
      })

      if (!regionData) {
        return res.status(404).send("Region not found")
      }
      return res.status(200).json({ success: true, msg: "Region data", data: regionData })
    } catch (error) {
      return res.status(500).json({ message: "Server error" })
    }
  }

}
