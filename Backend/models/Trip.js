// models/Trip.js
const mongoose = require("mongoose")

const TripSchema = new mongoose.Schema({
  userId: String,
  mood: String,
  days: Number,
  budget: Number,
  travelType: String,
  createdAt: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model("Trip", TripSchema)