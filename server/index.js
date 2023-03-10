require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const path = require('path')
const fileUpload = require('express-fileupload')
const router = require('./routes/index')
const errorMiddleware = require('./middleware/errorMiddleware')

const app = express(router)
const PORT = process.env.PORT || 5000

app.use(express.json())
app.use(cors())
app.use(fileUpload({}))
app.use(express.static(path.resolve(__dirname, 'static')))
app.use(errorMiddleware)
app.use('/pizza', router);

const start = async () => {
    try {
        await mongoose.connect(process.env.MONGO_DB)
        app.listen(PORT, () => {
            console.log(`Start on port ${PORT}`)
        })
    } catch (error) {
        console.log(error)
    }
}

start()