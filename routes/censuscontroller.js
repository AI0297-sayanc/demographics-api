const Census = require("../models/democensus")

/**
   *
   * @api {post} /testcensus/List of census data for block
   * @apiGroup Census data
   * @apiName Census
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
      "attributes":{
          "B01001_E001":"1634",
          "B01001_E002":"786444"
      }
}
   *  }
   *
   * @apiSuccessExample  {json} Sucess-Example: 200
    {
    "success": true,
    "msg": "Census data",
    "data": {
        "geoId": "060371972001",
        "name": "Block Group 1, Census Tract 1972, Los Angeles County, California",
        "attributes": {
            "B01001_E001": "1634",
            "B01001_E002": "786444"
        },
        "_id": "642e61443e15b68445e07233",
        "__v": 0
    }
    }
   */
module.exports = {
  async post(req, res) {
    const {
      geoId, name, attributes

    } = req.body
    try {
      const posData = await Census.create({
        geoId,
        name,
        attributes
      }).exec()
      // posData = posData.toObject()
      return res.status(200).json({
        success: true,
        msg: "Census data",
        data: posData,
      })
    } catch (error) {
      return res.status(500).json({ message: error })
    }
  }

}
