const Regions = require("../models/regions")

/**
 *
 * @api { get } /search-region Request for searching name in a region
 * @apiName List of all details in that region
 * @apiGroup  Search By Name in Region
 * @apiVersion  1.0.0

 * @apiQuery {String}  name [NAME] of the given point of that region
 * @apiSuccessExample {json} Success-Response:200
 *{
    "success": true,
    "msg": "Name of Regions",
    "data":[
         {
    _id: ObjectId("6407175672f32bc232877701"),
    AFFGEOID: '0500000US29133',
    ALAND: 1065995424,
    AWATER: 44494841,
    GEOID: '29133',
    LSAD: '06',
    NAME: 'Mississippi',
    STATEFP: '29',
    category: 'county',
    geometry: {
      type: 'Polygon',
      coordinates: [
        [
          [ -89.519809, 36.869617 ],
          [ -89.501516, 36.877131 ],
          [ -89.501683, 36.906262 ]....
    ]
     {
    _id: ObjectId("640716dc72f32bc2328769eb"),
    AFFGEOID: '0400000US28',
    ALAND: Long("121533519481"),
    AWATER: Long("3926919758"),
    GEOID: '28',
    LSAD: '00',
    NAME: 'Mississippi',
    STATEFP: '28',
    STATENS: '01779790',
    STUSPS: 'MS',
    category: 'state',
    geometry: {
      type: 'MultiPolygon',
      coordinates: [
        [
          [
            [ -88.502966, 30.215235 ],
            [ -88.491759, 30.209014 ],
            [ -88.468668, 30.203731 ]...
          ]
}
 */
module.exports = {
  async get(req, res) {
    const { name } = req.query
    try {
      const searchName = await Regions.aggregate([
        {
          $search: {
            index: "custom",
            text: {
              query: name,
              path: "NAME"
            }
          }
        }
      ])
      return res.status(200).json({ success: true, msg: "Name of Regions", data: searchName })
    } catch (error) {
      // console.error(error)
      return res.status(500).json({ message: "Server error" })
    }
  }
}
