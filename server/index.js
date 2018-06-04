const db = require('./db')

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

var express = require('express')
const app = express()

function search (term, table, field) {
  return new Promise((resolve, reject) => {
    db.get().query(`SELECT * FROM ${table} WHERE ${field} LIKE ?`, `%${term}%`, (err, results) => {
      if (err) reject(err)
      resolve(results)
    });
  })
}

app.get('/search', (req, res) => {

  const { term } = req.query
  const tokens = term.split(' ')

  const positions = tokens.map(token => ({
    token,
    position: term.indexOf(token),
    size: token.length
  }))

  const output = {
    brands: [],
    clothes: []
  }
  const outPromises = []

  tokens.forEach(token => {
    outPromises.push(search(token, 'brands', 'name'))
  })

  tokens.forEach(token => {
    outPromises.push(search(token, 'clothes', 'type'))
  })

  Promise.all(outPromises).then(([brands, clothes]) => {
    output.brands = brands
    output.clothes = clothes

    res.json(output)

  }).catch(error => {
    res.status(500).json({
      error
    })
  })
})

db.connect((err) => {

  if (err) {
    console.log(err.message)
    return
  }

  app.listen(3000)
  console.log('Server listening @ port 3000')
})