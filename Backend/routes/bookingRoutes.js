const express = require("express");
const router = express.Router();
const Booking = require("../models/Booking");

router.post("/", async (req, res) => {
  try {
    console.log("BODY:", req.body); // debug

    const booking = new Booking(req.body);
    await booking.save();

    res.json({ msg: "Booking saved successfully" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ msg: "Error saving booking" });
  }
});

module.exports = router;