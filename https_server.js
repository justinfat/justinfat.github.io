const fs = require('fs')
const https = require('https')
const config = require('./config.js')

// include `express`
const express = require('express')

// create an express, aka web server, instance
const app = express()

const port = process.argv[2]

const sslOptions = {
  key: fs.readFileSync(config.key_path),
  ca: fs.readFileSync(config.ca_path),
  cert: fs.readFileSync(config.cert_path)
}

const server = https.createServer(sslOptions, app)

server.listen(port, () => {
	console.log(`listen on port ${port}`)
})

// handle other urls
app.use(express.static(`${__dirname}/LockerStore`))

app.get('./sign_up', (req, res) => {
  res.send(`${req.query.account}`)
})

/*
// start the server
app.listen(port, () => {
  console.log(`listening on port: ${port}`)
})

// handle other urls
app.use(express.static(`${__dirname}/LockerStore`))

app.get('./sign_up', (req, res) => {
  res.send(`${req.query.account}`)
})
*/
