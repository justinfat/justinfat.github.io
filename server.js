// include `express`
const express = require('express')

// create an express, aka web server, instance
const app = express()

const port = process.argv[2]

const config = require('./config')
const mysql = require('mysql')

const connection = mysql.createConnection(config.mysql)

// start the server
app.listen(port, () => {
  console.log(`listening on port: ${port}`)
})

// handle other urls
app.use(express.static(`${__dirname}/LockerStore`))

connection.connect(err => {
  if (err) {
    console.log('fail to connect:', err)
    process.exit()
  }
})

app.get('./sign_up', (req, res) => {
  res.send(`${req.query.account}`)
})

app.get('/insertInfo', (req, res) => {
  connection.query(
    `INSERT INTO lockers (id, lat, lng, name, addr) 
    SELECT NULL, '${req.query.lat}', '${req.query.lng}', '${req.query.name}', '${req.query.addr}' FROM DUAL
    WHERE NOT EXISTS (SELECT 1 FROM lockers WHERE name = '${req.query.name}' LIMIT 1);`, (err, result) => {
      if (err) console.log('fail to insert:', err)
    })
  res.send(`ok`)
})

app.get('/searchInfo', (req, res) => {
  connection.query(
    `SELECT name, addr FROM lockers WHERE lat = '${req.query.lat}' AND lng = '${req.query.lng}'`, function (error, results, fields) {
      if (error) throw error
      res.send({
        name: results[0].name,
        addr: results[0].addr,
      })
    })
})