const express = require("express");
const router = express.Router();
const  Contact = require("../models/contact")

router.post("/", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    const newContact = new Contact({ name, email, message });
    await newContact.save();
    res.json({ msg: "Message saved successfully" });
  } catch (err) {
    console.log(err);
    res.status(500).json({ msg: "Error saving message" });
  }
});

module.exports = router;