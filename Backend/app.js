const express = require('express')
const cors = require('cors')
const dotenv = require('dotenv')
const dbConnection = require('./config/dbConnection')
const { readdirSync } = require('fs')



dotenv.config()
const app = express()
app.use(express.json())
app.use(cors())
dbConnection()

readdirSync("./routes").map((item) => app.use("/", require("./routes/" + item)));

const PORT = process.env.PORT || 5000
app.listen(PORT, (err, res) => {
    if (err) {
        console.log('server is error');
    } else {
        console.log(`server is running ${PORT}`);
    }
})