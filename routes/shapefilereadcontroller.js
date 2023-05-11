const fs = require("fs/promises")
// const FileUpload = require("../models/fileupload")

module.exports = {
  async get(req, res) {
    try {
      const shapeFileData = await fs.readFile("/home/ai/Demographics/public/geojsonoutput/op.json", { encoding: "utf8" })
      return res.status(200).json({ success: true, msg: "All data of shape file", data: shapeFileData })
    } catch (error) {
      console.log(error)
      return res.status(500).send({ status: "error", message: "Something went wrong" })
    }
  }

}
