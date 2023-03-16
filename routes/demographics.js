const Demographics = require("../models/demographics")

/**
 *
 * @api { get } /radius-demographics Request all demographics in a radius
 * @apiName List of all demographics in radius
 * @apiGroup Demographics in Radius
 * @apiVersion  1.0.0

 * @apiQuery {Number}  long [Longitude] of the given point of that location
 * @apiQuery {Number}  lat  [Latitude] of the given point of that location
 * @apiQuery {Number}  rad  [Radius] Length from the given lattitude and longitude
 * @apiSuccessExample {json} Success-Response:200
 * {
    "success": true,
    "msg": "Demographies in radius",
    "data": [
        {
            "_id": "63fc8366baf668b16c878ad7",
            "CENTLAT": 36.5951256,
            "CENTLON": -103.03308559999999,
            "location": {
                "type": "Point",
                "coordinates": [
                    -103.03308559999999,
                    36.5951256
                ],
                "_id": "64133db027b258330633d044"
            },
            "blockCode": 3292,
            "blockGroupCode": 3,
            "censusTractCode": 950200,
            "countryCode": 59,
            "ownerOccupied": 0,
            "renterOccupied": 2,
            "stateCode": 35,
            "totalPopulation": 4,
            "id": "63fc8366baf668b16c878ad7"
        },....
        ]

    }

*/

module.exports = {

  async get(req, res) {
    const { long, lat, rad } = req.query
    try {
      const demoData = await Demographics.find(
        {
          location: {
            $nearSphere: {
              $geometry: { type: "Point", coordinates: [parseFloat(long), parseFloat(lat)] },
              $maxDistance: parseFloat(rad),
              // spherical: true,
              // query: {}
            }
          }
        },
      )
      return res.status(200).send({ success: true, msg: "Demographies in radius", data: demoData })
    } catch (error) {
      return res.status(500).json({ message: "Server error" })
    }
  }

}
