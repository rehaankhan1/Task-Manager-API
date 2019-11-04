const express = require('express')
require('./db/mongoose')
const User = require('./models/user')
const Task = require('./models/task')
const userRouter = require('./routers/user')
const taskRouter = require('./routers/task')
const sharp = require('sharp')

const app = express()

const port = process.env.PORT || 3000

//npm i sharp@0.21.1


//parse incoming data to json
app.use(express.json())
app.use(userRouter)
app.use(taskRouter)
app.listen(port, () => {
    console.log('Server is up on Port '+ port)
})



