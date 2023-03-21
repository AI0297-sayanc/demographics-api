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
const regiondemographics = require("../regiondemographics")
const searchregion = require("../searchregion")

router.post("/login", login.post) // UNAUTHENTICATED
router.post("/signup", signup.post) // UNAUTHENTICATED
router.post("/forgotpassword", forgotpassword.startWorkflow) // UNAUTHENTICATED; AJAX
router.post("/resetpassword", forgotpassword.resetPassword) // UNAUTHENTICATED; AJAX

// given a point in which region it belong to
router.get("/getRegion", regions.get)

// fetch all demographics in a radius
router.get("/radius-demographics", demographics.get)

// given a region fetch all demographics in that regions
router.get("/region-demographics", regiondemographics.get)

// Given a string to search, to run full text searches on designated fields (e.g display name) and get all matching regions as a list
router.get("/region-name", searchregion.get)

router.all("*", checkJwt) // use this auth middleware for ALL subsequent routes

router.get("/users", users.find)
router.get("/user/:id", users.get)
router.post("/user", users.post)
router.put("/user/:id", users.put)
router.delete("/user/:id", users.delete)

module.exports = router
