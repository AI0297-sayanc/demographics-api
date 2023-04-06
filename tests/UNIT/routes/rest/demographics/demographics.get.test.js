const test = require("ava")
const sinon = require("sinon")

// const Joi = require("joi")
const {
  runRouteHandler, setupMongo, teardownMongo, setupFixtures, teardownFixtures
} = require("../../../../_utils")

const { get } = require("../../../../../routes/demographics")
const Demographics = require("../../../../../models/demographics")

/** Setup & Teardown code (COMMON) */
test.before(setupMongo)
test.after.always(teardownMongo)
test.beforeEach(setupFixtures)
test.afterEach(teardownFixtures)
/* ******************************* */
test.beforeEach(async (t) => {
  // eslint-disable-next-line no-param-reassign
  t.context.query = {
    long: -86.5010997,
    lat: 32.4711724,
    rad: 1000
  }
})

test.serial("Demographics.find: my passing test", async (t) => {
  const { status, body } = await runRouteHandler(get, {
    query: t.context.query
  })
  //   console.log("--------", body)
  t.is(status, 200)
  //   // t.false(body.error)
  t.is(body.data[0].location.coordinates[0], -86.5010997)
})

// test.skip("Demographics.get: Verify response after getting server error", async (t) => {
//   const stub = sinon.stub(Demographics, "find").throws(new Error("Server Error"))
//   const { status, body } = await runRouteHandler(get, {
//     query: t.context.query
//   })
//   console.log("..........", body)
//   t.is(status, 500)
//   t.true(body.error)
//   stub.restore()
// })
