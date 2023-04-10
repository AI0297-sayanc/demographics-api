const mongoose = require("mongoose")

class CoordinatePair extends mongoose.SchemaType {
  constructor(key, options) {
    super(key, options, "CoordinatePair")
  }

  // eslint-disable-next-line class-methods-use-this
  validate(val) {
    if (!Array.isArray(val)) throw new Error("Not an array!!!")
    if (val.length !== 2) throw new Error("Must be of size 2!!!")
    return false
  }

  // eslint-disable-next-line class-methods-use-this
  cast(val) {
    if (!Array.isArray(val)) throw new Error("Not an array!!!")
    if (val.length !== 2) throw new Error("Must be of size 2!!!")
    return val
  }
}

module.exports = CoordinatePair
