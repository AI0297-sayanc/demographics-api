const shapefile = require("shapefile")

shapefile.read("/home/ai/shpfile/Dist.shp")
  .then((source) => source.read().then(function log(result) {
    if (result.done) return
    console.log(result.value) // Extract the information you need here
    return source.read().then(log)
  }))
  .catch((error) => console.error(error))
