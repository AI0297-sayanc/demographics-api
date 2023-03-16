const Demographics = require("../models/demographics")
const Regions = require("../models/regions")

/**
 *
 * @api { get } /region-demographics Request all demographics in a region
 * @apiName List of all demographics in that region
 * @apiGroup Region Demographics
 * @apiVersion  1.0.0

 * @apiQuery {Number}  long [Longitude] of the given point of that location
 * @apiQuery {Number}  lat  [Latitude] of the given point of that location
 * @apiSuccessExample {json} Success-Response:200
 *{
    "success": true,
    "msg": "all demographics in a region",
    "data": [
        {
            "_id": "63fc836cbaf668b16c938d7f",
            "CENTLAT": 33.8111694,
            "CENTLON": -94.50278,
            "location": {
                "type": "Point",
                "coordinates": [
                    -94.50278,
                    33.8111694
                ],
                "_id": "64133b2d8737da1ee50df34c"
            },
            "blockCode": 1066,
            "blockGroupCode": 1,
            "censusTractCode": 98900,
            "countryCode": 89,
            "ownerOccupied": 11,
            "renterOccupied": 3,
            "stateCode": 40,
            "totalPopulation": 34,
            "id": "63fc836cbaf668b16c938d7f"
        },
        {
            "_id": "63fc836cbaf668b16c938d80",
            "CENTLAT": 33.837638899999995,
            "CENTLON": -94.49632159999999,
            "location": {
                "type": "Point",
                "coordinates": [
                    -94.49632159999999,
                    33.837638899999995
                ],
                "_id": "64133b2d8737da1ee50df34d"
            },
            "blockCode": 1069,
            "blockGroupCode": 1,
            "censusTractCode": 98900,
            "countryCode": 89,
            "ownerOccupied": 11,
            "renterOccupied": 0,
            "stateCode": 40,
            "totalPopulation": 28,
            "id": "63fc836cbaf668b16c938d80"
        },...........
    ]
}
 */

module.exports = {
  async get(req, res) {
    const { long, lat } = req.query
    /* console.log("req.query ==> ", req.query) */
    try {
      const myregion = await Regions.findOne({

        boundaries: {
          $geoIntersects: {
            $geometry: { type: "Point", coordinates: [parseFloat(long), parseFloat(lat)] },
          },
        },

      })
      const data = await Demographics
        .find({ location: { $geoWithin: { $geometry: myregion.boundaries } } })
      return res.status(200).send({ success: true, msg: "all demographics in a region", data })
    } catch (error) {
      /* console.log("error ==> ", error) */
      return res.status(500).json({ message: "Server error" })
    }
  }
}
