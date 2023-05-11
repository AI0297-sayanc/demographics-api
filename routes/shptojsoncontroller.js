const execa = require("execa")
const FileUpload = require("../models/fileupload")

module.exports = {

  async post(req, res) {
    try {
      const rdocs = req.files.rdoc[0].filename
      const doc = new FileUpload({ rdoc: rdocs })
      console.log(doc.rdoc)

      process.env.SHAPE_RESTORE_SHX = "YES"

      // const { stdout } = await execa(`${process.env.SHAPE_RESTORE_SHX} ogr2ogr`, ["/home/ai/Demographics/public/geojsonoutput/op.json", `/home/ai/Demographics/public/uploads/rdoc/${doc.rdoc}`])

      const { stdout } = await execa("ogr2ogr", ["/home/ai/Demographics/public/geojsonoutput/op.json", `/home/ai/Demographics/public/uploads/rdoc/${doc.rdoc}`])

      console.log(stdout)
      return res.status(200).json({ success: true, msg: "data converted succesfully", data: stdout })
    } catch (err) {
      console.log(err)
      return res.status(500).send({ status: "error", message: "Something went wrong" })
    }
  }

}
