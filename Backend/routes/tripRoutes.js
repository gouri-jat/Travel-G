const express = require("express")
const router = express.Router()

router.post("/plan",(req,res)=>{

const {mood,budget,days} = req.body

let destination = ""

if(mood === "relax") destination = "Goa"
if(mood === "adventure") destination = "Manali"
if(mood === "romantic") destination = "Udaipur"
if(mood === "budget") destination = "Jaipur"

let itinerary = []

for(let i=1;i<=days;i++){
itinerary.push(`Day ${i}: Explore ${destination} attractions`)
}

res.json({
destination,
days,
budget,
itinerary
})

})

module.exports = router