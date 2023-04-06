const Regions = require("../models/demoregions")

/**
   *
   * @api {post} /testregion/List of region data for block
   * @apiGroup Region data
   * @apiName Regions
   *
   *
   * @apiParam (Request Body) {String}
   * @apiParam (Request Body) {String}
   * @apiParam (Request Body) {String}
   *
   * @apiParamExample  {json} Request-Example:
   *
   *  {
      "geoId":"060371972001",
      "name":"Block Group 1, Census Tract 1972, Los Angeles County, California",
      "geographicLevel": "State",
      "geometry":{
            "type": "Polygon",
            "coordinates": [
                [
                    [
                        -118.243823,
                        34.09561544
   *  }
   *
   * @apiSuccessExample  {json} Sucess-Example: 200
    {
    "success": true,
    "msg": "Name of Regions",
    "data": {
        "geoId": "060371972001",
        "name": "Block Group 1, Census Tract 1972, Los Angeles County, California",
        "geographicLevel": "State",
        "geometry": {
            "type": "Polygon",
            "coordinates": [
                [
                    [
                        -118.243823,
                        34.09561544
                    ],
    }
   */
module.exports = {
  async post(req, res) {
    const {
      geoId, name,
      geographicLevel, geometry

    } = req.body
    try {
      const posData = await Regions.create({
        geoId,
        name,
        geographicLevel,
        geometry
      }).exec()
      // posData = posData.toObject()
      return res.status(200).json({
        success: true,
        msg: "Name of Regions",
        data: posData,
      })
    } catch (error) {
      return res.status(500).json({ message: error })
    }
  }

}
