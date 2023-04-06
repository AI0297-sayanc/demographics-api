module.exports = function (regions) {
  // Write your custom logic and return a promise
  return regions.createIndex({ boundaries: "2dsphere" })
}
