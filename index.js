const bp = require("body-parser");
const express = require("express");
const app = express();
const cors = require("cors")
const fs = require("fs")
app.use(cors())
app.use(bp.json());
app.use(bp.urlencoded({ extended: true }));
var compression = require('compression')
app.use(compression())

app.post("/data/:key", function(req,res) {
  fs.readFile(`${req.params.key}.json`, "utf8", function(err,data) {
    if (err) {
      res.json({"res" : "404"})
      res.flush()
    } else {
res.json({"res" : "success", "data" : data})
res.flush()
        }
  })
})
app.post("/update", function(req,res) {
  fs.readFile(`${req.body.url}.json`, "utf8", function(err,data) {
    if (err) {
      res.json({"res" : "404"})
      res.flush()
    } else {
      fs.writeFile(`${req.body.url}.json`, JSON.stringify(req.body.data), function(err) {
        if (err) {
          
          res.json({"res" : "404"})
          res.flush()
        } else {
res.json({"res" : "success"})
res.flush()
        }
      })

    }
  })
})

app.post("/get/:key", function(req,res) {
  fs.readFile(`${req.params.key}.json`, "utf8", function(err,data) {

    if (err) {
      res.json({"res" : "404"})
      res.flush()
    } else {
  res.json({"res" : "success", "data" : data})
  res.flush()
    }
  })
})
app.post("/create/:key/:key2", function(req,res) {
fs.readFile(`${req.params.key}:${req.params.key2}.json`, "utf8", function(err,data) {
  if (err) {
    fs.writeFile(`${req.params.key}:${req.params.key2}.json`, "{}", err => {
      if (err) throw err

      res.json({"url" : `https://KudoDB.kudos.repl.co/get/${req.params.key}:${req.params.key2}`})
      res.flush()
    })
  }
})
})
app.listen(8080)
