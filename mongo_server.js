// include `express`
const express = require('express')

// create an express, aka web server, instance
const app = express()

const port = process.argv[2]

const config = require('./config')
const mongoose = require('mongoose')

const url = `mongodb://${config.mongodb.user}:${config.mongodb.password}@${config.mongodb.host}/${config.mongodb.database}`

const conn = mongoose.createConnection(url, { useNewUrlParser: true, useUnifiedTopology: true }, (err, res) => {
  if (err) console.log('fail to connect:', err)
});
mongoose.Promise = global.Promise


// start the server
app.listen(port, () => {
  console.log(`listening on port: ${port}`)
})

// handle other urls
app.use(express.static(`${__dirname}/LockerStore`))

app.get('/sign_up', (req, res) => {
  res.send(`${req.query.account}`)
})

// student schema
const lockerCollectionName = 'lockers'
const lockerSchema = new mongoose.Schema({
  id: int,
  lat: double,
  lng: double,
  name: String,
  addr: String
}, { collection: lockerCollectionName });
const lockerModel = conn.model(lockerCollectionName, lockerSchema);

// insert
const saveAll = (data, model) => {
  for (d of data) {
    const m = new model(d)
    m.save((err) => {
      if (err) {
        console.log('fail to insert:', err)
        conn.close()
        process.exit()
      }
    })
  }
}
saveAll(studentData, studentModel)
saveAll(courseData, courseModel)

// query
lockerModel.findOne({ id: 'B0001'} ).exec((err, res) => {
  if (err) console.log('fail to query:', err)
  else {
    console.log(res.name + ' have students ' + res.students)
    conn.close()
  }
})


// app.get('/insertLocker', (req, res) => {
//   connection.query(
//     `INSERT INTO lockers (id, lat, lng, name, addr) 
//     SELECT NULL, '${req.query.lat}', '${req.query.lng}', '${req.query.name}', '${req.query.addr}' FROM DUAL
//     WHERE NOT EXISTS (SELECT 1 FROM lockers WHERE name = '${req.query.name}' LIMIT 1);`, (err, result) => {
//     if (err) console.log('fail to insert:', err)
//   })
//   res.send(`ok`)
// })

// app.get('/searchLocker', (req, res) => {
//   connection.query(
//     `SELECT name, addr FROM lockers WHERE lat = '${req.query.lat}' AND lng = '${req.query.lng}'`, function (error, results, fields) {
//       if (error) throw error
//       res.send({
//         name: results[0].name,
//         addr: results[0].addr,
//       })
//     })
// })

// app.get('/searchTag', (req, res) => {
//   var arr = req.query.keywords.split('#');
//   var keywords = arr.join('');
//   var queryString;
//   if(req.query.sorter==='priceNum')
//   {
//     queryString = `SELECT * FROM shops WHERE MATCH (name, tag) AGAINST ('${keywords}' IN BOOLEAN MODE) ORDER BY ${req.query.sorter} ASC`;
//   }
//   else
//   {
//     queryString = `SELECT * FROM shops WHERE MATCH (name, tag) AGAINST ('${keywords}' IN BOOLEAN MODE) ORDER BY ${req.query.sorter} DESC`;
//   }
//   // console.log(queryString)
//   connection.query(
//     queryString, function (error, results, fields) {
//       if (error) throw error
//       res.send({
//         results: results,
//       })
//     })
// })

// app.get('/searchShop', (req, res) => {
//   connection.query(
//     `SELECT * FROM shops WHERE name = '${req.query.name}'`, function (error, results, fields) {
//       if (error) throw error
//       // if (error) {
//       //   res.send('error')
//       // }
//       else {
//           res.send({
//             id: results[0].id,
//             name: results[0].name,
//             starNum: results[0].starNum,
//             commentNum: results[0].commentNum,
//             tag: results[0].tag,
//             addr: results[0].addr,
//             tel: results[0].tel,
//             img: results[0].img,
//           })
//         }
//     })
// })

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