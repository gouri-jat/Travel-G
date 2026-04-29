// controllers/tripController.js
const Trip = require("../models/Trip")

exports.saveTrip = async (req, res) => {
  try {
    const { mood, days, budget, travelType } = req.body

    const newTrip = new Trip({
      mood,
      days,
      budget,
      travelType
    })

    await newTrip.save()

    res.json({ msg: "Trip saved successfully" })

  } catch (err) {
    res.status(500).send("Server Error")
  }
}