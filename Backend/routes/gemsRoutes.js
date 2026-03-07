const express = require("express")
const router = express.Router()

router.get("/",(req,res)=>{

const gems = [
{name:"Ziro Valley", state:"Arunachal Pradesh"},
{name:"Tawang", state:"Arunachal Pradesh"},
{name:"Chopta", state:"Uttarakhand"},
{name:"Gokarna", state:"Karnataka"}
]

res.json(gems)

})

module.exports = router