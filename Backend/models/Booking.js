const mongoose = require("mongoose");

const bookingSchema = new mongoose.Schema({
  name: String,
  email: String,
  hotel: String,
  checkin: String,
  checkout: String
}, { timestamps: true });

module.exports = mongoose.model("Booking", bookingSchema);