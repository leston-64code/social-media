const express = require('express')
const helmet = require("helmet")
require("dotenv").config()
const createTables = require('./config/startupQuery');
const connection = require('./config/db');

const app = express()

app.use(express.json())
app.use(helmet())

const PORT = process.env.PORT || 4001

app.use("/api/auth", require("./routes/authRoutes"))
app.use("/api/post", require("./routes/postRoutes"))
app.use("/api/profile", require("./routes/profileRoutes"))
app.use("/api/follow", require("./routes/followRoutes"))

app.listen(PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`)
})

connection.connect((err)=>{
  if(err){
    console.log(err)
  }else{
    console.log("Connected successfully")
    // createTables(connection)
  }
})

