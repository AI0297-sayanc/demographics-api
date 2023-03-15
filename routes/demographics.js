const mongoose = require("mongoose")

const Demographics = require("../models/demographics")

/* 2. Given a point and radius fetch all demographics in that radius */

module.exports = {
  async get(req, res) {
    const { longitude, latitude, radius } = req.body
    // console.log(longitude, latitude, radius)
    try {
      const demoData = await Demographics.aggregate([
        {
          $geoNear: {
            near: {
              type: "Point",
              coordinates: [parseFloat(longitude), parseFloat(latitude)]
            },
            key: "location",
            maxDistance: parseFloat(radius) * 1609,
            distanceField: "dist.calculated",
            spherical: true,
            query: {}
          },
        },
      ])
      res.status(200).send({ success: true, msg: "Demo details", data: demoData })
    } catch (error) {
    // console.error(error)
      res.status(500).json({ message: "Server error" })
    }
  }
}
