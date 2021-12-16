const express = require('express')
const path = require('path')

const Rollbar = require('rollbar')
const rollbar = new Rollbar({
  accessToken: '8e48320c64264eecb2cbd07758a512ce',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

const app = express()

app.use(express.json())

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, '/public/index.html'))
    rollbar.info('html file serverd successfully')
})


app.get('/', (req, res) => {
        rollbar.error("something went wrong!")
})

app.use(rollbar.errorHandler())

const port = process.env.PORT || 4545

app.listen(port, () => console.log(`The horses name was port ${port}`))