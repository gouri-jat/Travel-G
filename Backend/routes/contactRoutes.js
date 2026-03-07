const express = require("express")
const router = express.Router()

router.post("/send",(req,res)=>{

const {name,email,message} = req.body

console.log(name,email,message)

res.json({
msg:"Message received successfully"
})

})

module.exports = router