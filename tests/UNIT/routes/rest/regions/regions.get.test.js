const test = require("ava")

const {
  runRouteHandler, setupMongo, teardownMongo, setupFixtures, teardownFixtures
} = require("../../../../_utils")

const { get } = require("../../../../../routes/regions")
const Regions = require("../../../../../models/regions")

/** Setup & Teardown code (COMMON) */
test.before(setupMongo)
test.after.always(teardownMongo)
test.beforeEach(setupFixtures)
test.afterEach(teardownFixtures)
/* ******************************* */
test.beforeEach(async (t) => {
  // eslint-disable-next-line no-param-reassign
  t.context.query = {
    long: -103.002188,
    lat: 36.602716

  }
})

test.serial("Regions.find: my passing test", async (t) => {
  const { status, body } = await runRouteHandler(get, {
    query: t.context.query
  })
  //   console.log("--------", body)
  t.is(status, 200)
})
// test.skip("Regions.get: Verify response after getting server error", async (t) => {
//   const stub = sinon.stub(Regions, "findOne").throws(new Error("Server Error"))
//   const { status, body } = await runRouteHandler(get, {
//     params: {
//       id: t.context.validId
//     }
//   })
//   t.is(status, 500)
//   t.true(body.error)
//   stub.restore()
// })
