const test = require("ava")
// const sinon = require("sinon")

// const Joi = require("joi")
const {
  runRouteHandler, setupMongo, teardownMongo, setupFixtures, teardownFixtures
} = require("../../../../_utils")

const { get } = require("../../../../../routes/regiondemographics")
const Demographics = require("../../../../../models/demographics")
const Regions = require("../../../../../models/regions")

/** Setup & Teardown code (COMMON) */
test.before(setupMongo)
test.after.always(teardownMongo)
test.beforeEach(setupFixtures)
test.afterEach(teardownFixtures)
/* ******************************* */

test.beforeEach(async (t) => {
  // eslint-disable-next-line no-param-reassign
  t.context.validRegionID = "640716dc72f32bc2328769f6"
})

// test.serial("Regionsdemographics.get: Verify response after entering valid Region id", async (t) => {
//   const { status, body } = await runRouteHandler(get, {
//     query: t.context.query

//   })
//   console.log("body ==> ", body)
//   //   t.is(body.regions._id, regid)
//   t.is(status, 200)
//   t.false(body.error)
// })

test.serial("Region.get:Region id", async (t) => {
  const { status, body } = await runRouteHandler(get, {
    params: {
      id: t.context.regid
    }
  })

  console.log("--------", body)
  t.is(status, 500)
//   t.true(body.error)
})
// test.skip("Regionsdemographics.get: Verify response after getting server error", async (t) => {
//   const stub = sinon.stub(Regions, "findOne").throws(new Error("Server Error"))
//   const { status, body } = await runRouteHandler(get, {
//     params: {
//       id: t.context.validRegionID,
//     }
//   })
//   t.is(status, 500)
//   t.true(body.error)
//   stub.restore()
// })
