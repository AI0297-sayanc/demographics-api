module.exports = function (demographics) {
// Write your custom logic and return a promise
  return demographics.createIndex({ location: "2dsphere" })
}

// const create2dsphereIndex = async (demographics) => {
//   try {
//     await demographics.createIndex({ location: "2dsphere" })
//     console.log("2d sphere index created")
//   } catch (error) {
//     console.log(`Failed to create' field: ${error}`)
//   }
// }

// module.exports = create2dsphereIndex
