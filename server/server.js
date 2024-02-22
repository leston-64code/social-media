const express = require('express')
const helmet = require("helmet")
require("dotenv").config()
const mysql = require('mysql2');
const createTables = require('./config/startupQuery');

const app = express()

app.use(express.json())
app.use(helmet())

const PORT = process.env.PORT || 4001

app.listen(PORT, () => {
  console.log(`Server is listening on port ${process.env.PORT}`)
})

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'leston@mite987',
  port:3306,
  database: 'social_media'
});

connection.connect((err)=>{
  if(err){
    console.log(err)
  }else{
    console.log("Connected successfully")
    createTables(connection)
  }
})

