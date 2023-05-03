const Openrouteservice = require("openrouteservice-js")
const Region = require("../models/regions")

module.exports = {
  async get(req, res) {
    try {
      const { long, lat, range } = req.query
      // console.log("long ==> ", Number(long), typeof long)
      // const Isochrones = new Openrouteservice.Isochrones({ api_key: process.env.DIRECTION_API_KEY })
      const Isochrones = new Openrouteservice.Isochrones({ api_key: process.env.DIRECTION_API_KEY, host: "http://localhost:8080/ors" })
      const { features } = await Isochrones.calculate({
        locations: [[Number(long), Number(lat)]],
        profile: "driving-car",
        range: [Number(range)],
        range_type: "time"
      })

      const regions = await Region.find({
        centroid: {
          $geoWithin: {
            $geometry: features[0].geometry
          }
        }
      })

      return res.status(200).json({ success: true, regions })
    } catch (error) {
      // console.log('--------', JSON.stringify(error))
      return res.status(400).json({ error })
    }
  }

}
