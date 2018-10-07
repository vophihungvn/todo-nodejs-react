const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

const routers = require('./routers')

const app = express()

app.use(cors())
app.use(bodyParser.json())

app.use('/api', routers)

app.listen(3030, () => {
  console.log('App is listenning on port 3030')
})