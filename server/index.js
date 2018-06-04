var sqlite3 = require('sqlite3')
var db = new sqlite3.Database('data/sqlite.db')

const brands = [
  "Gap",
  "Banana Republic",
  "Boss",
  "Hugo Boss",
  "Taylor ",
  "Rebecca Taylor"
]

const clothes = [
  "Denim",
  "Pants",
  "Sweaters",
  "Skirts",
  "Dresses"
]

db.serialize(function () {
    db.run("CREATE TABLE IF NOT EXISTS brands (id INTEGER AUTO-INCREMENT, name TEXT)")
    db.run("CREATE TABLE IF NOT EXISTS clothes (id INTEGER AUTO-INCREMENT, name TEXT)")
    db.run("INSERT INTO counts (key, value) VALUES (?, ?)", "counter", 0)
})

var express = require('express')
const app = express()

app.get('/search', (req, res) => {
    db.get("SELECT value FROM counts", function(err, row){
        res.json({ "count" : row.value })
    })
})

app.listen(3000)