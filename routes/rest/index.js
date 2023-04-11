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

router.post("/login", login.post) // UNAUTHENTICATED
router.post("/signup", signup.post) // UNAUTHENTICATED
router.post("/forgotpassword", forgotpassword.startWorkflow) // UNAUTHENTICATED; AJAX
router.post("/resetpassword", forgotpassword.resetPassword) // UNAUTHENTICATED; AJAX

// route for demoregion
router.post("/region", regioncontroller.post)
router.get("/region", regioncontroller.get)
router.get("/getregion", regioncontroller.get)

// route for census
router.post("/testcensus", censuscontroller.post)

// router.all("*", checkJwt) // use this auth middleware for ALL subsequent routes

router.get("/users", users.find)
router.get("/user/:id", users.get)
router.post("/user", users.post)
router.put("/user/:id", users.put)
router.delete("/user/:id", users.delete)

module.exports = router
