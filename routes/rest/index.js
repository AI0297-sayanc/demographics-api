const express = require("express")
const router = express.Router()

const { expressjwt } = require("express-jwt")

const checkJwt = expressjwt({ secret: process.env.SECRET, algorithms: ["HS256"] }) // the JWT auth check middleware

const login = require("./auth")
const signup = require("./auth/signup")
const forgotpassword = require("./auth/password")
const users = require("./users")
const regions = require("../regions")
const demographics = require("../demographics")
const demographics2 = require("../demographics2")

router.post("/login", login.post) // UNAUTHENTICATED
router.post("/signup", signup.post) // UNAUTHENTICATED
router.post("/forgotpassword", forgotpassword.startWorkflow) // UNAUTHENTICATED; AJAX
router.post("/resetpassword", forgotpassword.resetPassword) // UNAUTHENTICATED; AJAX

// routes for regions
router.get("/getRegion/:longitude/:latitude", regions.get)

// routes all demographics in that radius
router.get("/fetchDemoinRad/:longitude/:latitude/:radius", demographics.get)

// given a region fetch all demographics in that regions
router.get("/allDemoinRegion/:longitude/:latitude", demographics2.get)

router.all("*", checkJwt) // use this auth middleware for ALL subsequent routes

router.get("/users", users.find)
router.get("/user/:id", users.get)
router.post("/user", users.post)
router.put("/user/:id", users.put)
router.delete("/user/:id", users.delete)

module.exports = router
