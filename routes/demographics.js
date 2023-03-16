const Demographics = require("../models/demographics")

/**
 *
 * @api { get } /fetchDemoinRad/:longitude/:latitude/:radius Request all demographics in that radius
 * @apiName List of all demographics in that radius
 * @apiGroup Demographics
 * @apiVersion  1.0.0

 * @apiParam {Number}  longitude Longitude of the given point of that location
 * @apiParam {Number}  latitude  Latitude of the given point of that location
 * @apiParam {Number}  radius    Lenth from the given lattitude and longitude
 * @apiSuccessExample {json} Success-Response:200
 * {
   "success": true,
    "msg": "all demographics in regions",
    "data": {
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
                    ].........
                     ]
            ],
            "_id": "6411fddb942612481c0917cc"
        },
        "id": "640716dc72f32bc2328769ec"
    }

*/

module.exports = {

  async get(req, res) {
    const { longitude, latitude, radius } = req.params
    try {
      const demoData = await Demographics.find(
        {
          location: {
            $nearSphere: {
              $geometry: { type: "Point", coordinates: [parseFloat(longitude), parseFloat(latitude)] },
              $maxDistance: parseFloat(radius) * 1609,
              // spherical: true,
              // query: {}
            }
          }
        },
      )
      return res.status(200).send({ success: true, msg: "Demo details", data: demoData })
    } catch (error) {
    // console.error(error)
      return res.status(500).json({ message: "Server error" })
    }
  },

  /* 3.given a region fetch all demographics in regions */

  // eslint-disable-next-line no-dupe-keys
  /* async get(req, res) {
    // const { longitude, latitude, radius } = req.body
    const { longitude, latitude } = req.params

    try {
      const myregion = await Regions.findOne({

        boundaries: {
          $geoIntersects: {
            $geometry: { type: "Point", coordinates: [parseFloat(longitude), parseFloat(latitude)] },
          },
        },

      })
      Demographics
        .find({ location: { $geoWithin: { $geometry: myregion.boundaries } } })
      return res.status(200).send({ success: true, msg: "all demographics in regions", data: myregion })
    } catch (error) {
      // console.error(error)
      return res.status(500).json({ message: "Server error" })
    }
  }, */

}
