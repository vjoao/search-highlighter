const db = require('./db')
const cors = require('cors')({ origin: true })

var express = require('express')
const app = express()

app.use(cors)

function search (term, table, field) {
  return new Promise((resolve, reject) => {
    db.get().query(`SELECT * FROM ${table} WHERE ${field} LIKE ?`, `%${term}%`, (err, results) => {
      // console.log(term, table, field, results)
      if (err) reject(err)
      resolve(results)
    });
  })
}

app.get('/search', async (req, res) => {

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

  try {
    output.brands = tokens.map(async token => {
      const brandResults = await search(token, 'brands', 'name')
      return {
        [token]: brandResults
      }
    })

    output.clothes = tokens.map(async token => {
      const clothResults = await search(token, 'clothes', 'type')
      return {
        [token]: clothResults
      }
    })
  } catch (err) {
    res.status(500).json({ err })
    return
  }

  const brands = await Promise.all(output.brands)
  const clothes = await Promise.all(output.clothes)

  res.json({
    brands: brands.map(brand => {
      return {
        brand: Object.keys(brand)[0],
        count: Object.keys(brand).reduce((prev, current) => {
          return brand[current].length + prev
        }, 0)
      }
    }),
    clothes: clothes.map(cloth => {
      return {
        cloth: Object.keys(cloth)[0],
        count: Object.keys(cloth).reduce((prev, current) => {
          return cloth[current].length + prev
        }, 0)
      }
    }),
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