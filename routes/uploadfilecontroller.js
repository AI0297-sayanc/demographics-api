const FileUpload = require("../models/fileupload")

module.exports = {
  async post(req, res) {
    try {
      const rdocs = req.files.rdoc[0].filename
      if (rdocs) {
        const doc = new FileUpload({ rdoc: rdocs })

        const docUpld = await doc.save()
        res.status(201).send({
          status: "success",
          message: "File uploaded successfully",
          rdoc: docUpld
        })
      } else {
        res.status(400).send({ status: "failed", message: "A file is required" })
      }
    } catch (error) {
      console.log(error)
      res.status(500).send({ status: "error", message: "Something went wrong" })
    }
  }
}
