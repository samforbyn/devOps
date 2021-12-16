const express = require('express')
const path = require('path')

const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: '8e48320c64264eecb2cbd07758a512ce',
  captureUncaught: true,
  captureUnhandledRejections: true,
})
let students = []
const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file serverd successfully')
})

app.post('/api/student', (req, res) => {
    let {name} = req.body
    name = name.trim()
    
    students.push(name)
    
    rollbar.info('Student added succesfully', {author: "Samuelito", type: "manual"})
    res.status(200).send(students)
})



app.get('/', (req, res) => {
        rollbar.error("something went wrong!")
})

app.use(rollbar.errorHandler())

const port = process.env.PORT || 4545

app.listen(port, () => console.log(`The horses name was port ${port}`))