const express = require("express")
const router = express.Router()
const { expressjwt } = require("express-jwt")
const regioncontroller = require("../regioncontroller")
const censuscontroller = require("../censuscontroller")

const checkJwt = expressjwt({ secret: process.env.SECRET, algorithms: ["HS256"] }) // the JWT auth check middleware

const login = require("./auth")
const signup = require("./auth/signup")
const forgotpassword = require("./auth/password")
const users = require("./users")
const drivetimecontroller = require("../drivetimecontroller")
const msasearchcontroller = require("../msasearchcontroller")
const zipcodecontroller = require("../zipcodecontroller")
const allmsa = require("../allmsa")
const uploadfilecontroller = require("../uploadfilecontroller")
const upload = require("../middlewares")
const pointsearchcontroller = require("../pointsearchcontroller")
const singleregioncontroller = require("../singleregioncontroller")
const censusdatacontroller = require("../censusdatacontroller")
const shptojsoncontroller = require("../shptojsoncontroller")
const shapefilereadcontroller = require("../shapefilereadcontroller")

router.post("/login", login.post) // UNAUTHENTICATED
router.post("/signup", signup.post) // UNAUTHENTICATED
router.post("/forgotpassword", forgotpassword.startWorkflow) // UNAUTHENTICATED; AJAX
router.post("/resetpassword", forgotpassword.resetPassword) // UNAUTHENTICATED; AJAX

// route for region
router.post("/region", regioncontroller.post)
// router.get("/region/:id", regioncontroller.get)

// middleware route for multer
router.use("/shp2json", upload.fields([{ name: "rdoc", maxCount: 1 }]))

// router.use("/shpdata", upload.fields([{ name: "rdoc", maxCount: 1 }]))

// shp2json upload
router.post("/shp2json", shptojsoncontroller.post)

// Get a region.
router.get("/region/:id", singleregioncontroller.get)

// middleware route for multer
router.use("/upload", upload.fields([{ name: "rdoc", maxCount: 1 }]))

// fileupload
router.post("/upload", uploadfilecontroller.post)

// getshp file data
router.get("/shpdata", shapefilereadcontroller.get)

// route for msa
router.get("/search/msa/:geoid", msasearchcontroller.get)

// route for zipcode
router.get("/search/zipcode/:geoid", zipcodecontroller.get)

// all MSA(s)
router.get("/search/allmsa", allmsa.get)

// searching
router.get("/search/radius", regioncontroller.get)
router.get("/search/point", pointsearchcontroller.get)
router.get("/search/drivetime", drivetimecontroller.get)
router.get("/regions", regioncontroller.get)

// route for census
router.post("/testcensus", censuscontroller.post)
router.get("/census/:geoid", censusdatacontroller.get)

// router.all("*", checkJwt) // use this auth middleware for ALL subsequent routes

router.get("/users", users.find)
router.get("/user/:id", users.get)
router.post("/user", users.post)
router.put("/user/:id", users.put)
router.delete("/user/:id", users.delete)

module.exports = router
