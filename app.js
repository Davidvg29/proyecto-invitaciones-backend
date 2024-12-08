require("dotenv").config()

const express = require("express")
const routes = require("./routes/routes")
const morgan = require("morgan")
const cors = require("cors")
const {db} = require("./db")
const axios = require("axios")

const server = express()

server.use(express.json())
server.use(morgan("dev"))
server.use(cors())
server.use(routes)

const PORT = process.env.PORT || 3001

db.sync({force:true})
.then(()=>{
    server.listen(PORT, ()=>{
        console.log(`Server listening on port: ${PORT}`)
    })
})
.catch((error)=>{
    console.log("database connection failed", error)
})
