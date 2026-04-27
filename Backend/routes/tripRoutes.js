const express = require("express")
const router = express.Router()

router.post("/plan",(req,res)=>{

const {mood,budget,days} = req.body

let destination = ""

if(mood === "relax") destination = "Goa"
if(mood === "adventure") destination = "Manali"
if(mood === "romantic") destination = "Udaipur"
if(mood === "budget") destination = "Jaipur"

const activities = {
Manali: [
"Visit Solang Valley",
"Explore Rohtang Pass",
"Walk in Old Manali cafes",
"Visit Hidimba Temple",
"River rafting in Beas river",
"Shopping at Mall Road"
],

Goa: [
"Relax at Baga Beach",
"Water sports at Calangute",
"Visit Fort Aguada",
"Explore Old Goa churches",
"Sunset at Chapora Fort"
],

Udaipur: [
"Boat ride at Lake Pichola",
"Visit City Palace",
"Sunset at Sajjangarh (Monsoon Palace)",
"Explore Jag Mandir Island",
"Walk through Saheliyon ki Bari garden",
"Shopping at Hathi Pol Bazaar",
"Visit Jagdish Temple",
"Dinner with lake view at Ambrai Ghat"
],

Jaipur: [
"Visit Amber Fort",
"Explore City Palace",
"Photography at Hawa Mahal",
"Visit Jantar Mantar observatory",
"Shopping at Johari Bazaar",
"Sunset at Nahargarh Fort",
"Visit Jal Mahal",
"Explore Albert Hall Museum"
]
}

let itinerary = []

for(let i=0;i<=days;i++){
const activity = activities[destination][i % activities[destination].length]
itinerary.push(`Day ${i+1}: ${activity}`)
}
res.json({
destination,
days,
budget,
itinerary
})

})

module.exports = router