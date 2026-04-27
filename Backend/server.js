const express = require("express")
const dotenv = require("dotenv")
const cors = require("cors")

const connectDB = require("./db")

dotenv.config()

const app = express()

connectDB()
app.use(cors())
app.use(express.json())


app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/trip", require("./routes/tripRoutes"))
app.use("/api/gems", require("./routes/gemsRoutes"))

app.use("/api/contact", require('./routes/contactRoutes'))
app.use("/api/booking", require("./routes/bookingRoutes"))

const PORT = process.env.PORT || 5000
app.get("/",(req,res)=>{
  res.send("Server started");
})
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})

