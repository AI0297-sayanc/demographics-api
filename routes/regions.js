const Regions = require("../models/regions")

/**
 *
 * @api { get } /getRegion Request point in which region it belongs to
 * @apiName  Point to Region
 * @apiGroup Region
 * @apiVersion  1.0.0

 * @apiQuery {Number}  long [Longitude] of the given point of region
 * @apiQuery {Number}  lat  [Lattitude] of the given point of region
 * @apiSuccessExample {json} Success-Response:200
 *{
    "success": true,
    "msg": "Point to Region",
    "data": [
        {
            "_id": "640716dc72f32bc2328769ec",
            "AFFGEOID": "0400000US40",
            "ALAND": 177662925723,
            "AWATER": 3374587997,
            "GEOID": "40",
            "LSAD": "00",
            "NAME": "Oklahoma",
            "STATEFP": "40",
            "STATENS": "01102857",
            "STUSPS": "OK",
            "category": "state",
            "boundaries": {
                "type": "Polygon",
                "coordinates": [
                    [
                        [
                            -103.002565,
                            36.526588
                        ],
                        [
                            -103.002188,
                            36.602716
                        ],
                        ....
                    ]
                ],
                "_id": "64133f96507b09397e3c0353"
            },
            "id": "640716dc72f32bc2328769f3"
        }
    ]
}
*/
module.exports = {
  async get(req, res) {
    const { long, lat } = req.query
    try {
      const point = {
        type: "Point",
        coordinates: [parseFloat(long), parseFloat(lat)],
      }
      const regionData = await Regions.find({
        boundaries: {
          $geoIntersects: {
            $geometry: point
          },
        },
      }).exec()
      return res.status(200).json({ success: true, msg: "Point to Region", data: regionData })
    } catch (error) {
    // console.error(error)
      return res.status(500).json({ message: "Server error" })
    }
  }
}
