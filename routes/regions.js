const Regions = require("../models/regions")

/**
 *
 * @api { get } /getRegion/longitude/latitude Request point which regions it belong to
 * @apiName List of Points in Regions
 * @apiGroup Regions
 * @apiVersion  1.0.0

 * @apiParam {Number}  longitude Longitude of the given point of region
 * @apiParam {Number}  latitude  Lattitude of the given point of region
 * @apiSuccessExample {json} Success-Response:200
 *{
        "results": [
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
                        [
                            -103.002252,
                            36.61718
                        ],
                        [
                            -103.002518,
                            36.675186
                        ],
                        [
                            -103.002198,
                            36.719427
                        ].......
                          ],
                "_id": "6411e0b3d1437dd1e23bd74b"
            },
            "id": "640716dc72f32bc2328769f3"
        }

 }
*/
module.exports = {
  async get(req, res) {
    const { longitude, latitude } = req.params
    try {
      const point = {
        type: "Point",
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      }
      const regionData = await Regions.find({
        boundaries: {
          $geoIntersects: {
            $geometry: point
          },
        },
      }).exec()
      return res.status(200).json({ results: regionData })
    } catch (error) {
    // console.error(error)
      return res.status(500).json({ message: "Server error" })
    }
  }
}
