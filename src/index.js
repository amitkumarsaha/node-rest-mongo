let express = require('express')
let app = express()
let personRoute = require('./routes/person')
let customerRoute = require('./routes/customer')
let path = require('path')
let bodyParser = require('body-parser')

app.use(bodyParser.json())

app.use((req, resp, next) => {
    console.log(`${new Date().toString()} ==> ${req.originalUrl}`, req.body)
    next()
})
app.use(personRoute)
app.use(customerRoute)
app.use(express.static('public'))

//Handler for 404 - Resource not found
app.use((req, resp, next) => {
    resp.status(400).send('We think you are lost')
})

//Handler for 500
app.use((err, req, resp, next) => {
    console.error(err.stack)
    resp.sendFile(path.join(__dirname, '../public/500.html'))
})

const PORT = process.env.PORT || 3000
app.listen(PORT, () => console.log(`Server started on port: ${PORT}`))