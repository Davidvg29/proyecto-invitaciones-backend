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

const PORT = 3001

db.sync({force:false})
.then(()=>{
    server.listen(PORT, ()=>{
        console.log(`Server listening on port: ${PORT}`)
    })
})
.catch((error)=>{
    console.log("database connection failed", error)
})
