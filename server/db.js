var mysql = require('mysql')

var state = {
  connection: null
}

// TODO: change default passwords
exports.connect = function(done) {
  try {
    state.connection = mysql.createConnection({
      host: 'localhost',
      user: 'root',
      password: 'root',
      database: 'shop'
    })

    state.connection.connect()
    done()
  } catch (err) {
    done(err)
  }
}

exports.get = function() {
  return state.connection
}
