

// routes/tripRoutes.js
const express = require("express")
const router = express.Router()
const { saveTrip } = require("../controllers/tripController")

router.post("/save-trip", saveTrip)

module.exports = router
