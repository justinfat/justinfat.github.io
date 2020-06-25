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
const url = `mongodb://${config.mongodb.user}:${config.mongodb.password}@${config.mongodb.host}/${config.mongodb.database}`
const conn = mongoose.createConnection(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
  if (err) console.log('fail to connect:', err)
});
mongoose.Promise = global.Promise
const lockerSchema = new mongoose.Schema({
  name: String,
  addr: String,
  lat: mongoose.Schema.Types.Number,
  lng: mongoose.Schema.Types.Number
}, { collection: 'lockers' })
const lockerModel = conn.model('lockers', lockerSchema)
const shopSchema = new mongoose.Schema({
  name: String,
  starNum: mongoose.Schema.Types.Number,
  priceNum: mongoose.Schema.Types.Number,
  commentNum: mongoose.Schema.Types.Number,
  openTime: String,
  addr: String,
  img: String,
  tag: String,
  shopType: String,
  isGroup: mongoose.Schema.Types.Number
}, { collection: 'shops' })
const shopModel = conn.model('shops', shopSchema)

server.listen(port, () => {
	console.log(`listen on port ${port}`)
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

app.get('/insertLocker', (req, res) => {
  var myobj = { lat: req.query.lat, lng: req.query.lng, name: req.query.name, addr: req.query.addr };
  lockerModel.updateOne({ "name": req.query.name }, { $setOnInsert: myobj }, { upsert: true }, function (err, result) {
    if (err) throw err;
    res.send(`ok`);
  });
})

app.get('/searchLocker', (req, res) => {
  lockerModel.findOne({ lat: req.query.lat, lng: req.query.lng }).select({ name: 1, addr: 1 }).exec(function (err, result) {
    if (err) throw err;
    res.send({
      name: result.name,
      addr: result.addr,
    });
  });
})

app.get('/searchTag', (req, res) => {
  var arr = req.query.keywords.split('#');
  var keywords = arr.join('');
  var sorter = req.query.sorter;
  var query = {};
  if (req.query.sorter === 'priceNum') {
    query[sorter] = 1;
    shopModel.find({ $text: { $search: keywords } }).sort(query).exec(function (err, results) {
      if (err) throw err;
      if (results.length > 60) {
        res.send({
          results: results.slice(0, 60),
        })
      }
      else {
        res.send({
          results: results,
        })
      }
    });
  }
  else {
    query[sorter] = -1;
    shopModel.find({ $text: { $search: keywords } }).sort(query).exec(function (err, results) {
      if (err) throw err;
      if (results.length > 60) {
        res.send({
          results: results.slice(0, 60),
        })
      }
      else {
        res.send({
          results: results,
        })
      }
    });
  }
})

app.get('/searchShop', (req, res) => {
  shopModel.findOne({ name: req.query.name }, function (err, result) {
    if (err) throw err;
    res.send({
      id: result._id,
      name: result.name,
      starNum: result.starNum,
      priceNum: result.priceNum,
      commentNum: result.commentNum,
      openTime: result.openTime,
      addr: result.addr,
      img: result.img,
      tag: result.tag,
      shopType: result.shopType
    });
  });
})

// app.get('/getItem_single', (req, res) => {
//   connection.query(
//     `SELECT * FROM shop_${req.query.id} WHERE isGroup = 0`, function (error, results, fields) {
//       // if (error) throw error
//       res.send({
//         results: results,
//       })
//     })
// })

// app.get('/getItem_group', (req, res) => {
//   connection.query(
//     `SELECT * FROM shop_${req.query.id} WHERE isGroup = 1`, function (error, results, fields) {
//       // if (error) throw error
//       res.send({
//         results: results,
//       })
//     })
// })