const express = require('express')
const app = express()

var router = express.Router();

var pg = require('pg');
var conString = "postgres://nylvbgixchinga:56ad58ff2c4552bba4c1938d65d71056298463ce29c1a0b60725c1748235601c@ec2-174-129-224-33.compute-1.amazonaws.com:5432/d47re80ao05f5k?ssl=true";

var db = new pg.Client(conString);

db.connect();

app.set("port", process.env.PORT || 3001);


router.get('/test', function(req, res) {
	db.query('SELECT * FROM basic_names', function(err, result) {
	  console.log('id: %d and name: %s', result.rows[0].id, result.rows[0].name);
	  var responseString = "Database successfully queried --> id: " + result.rows[0].id + "name: " + result.rows[0].name;
	  //since the row object is just a hash, it can be accessed also as follows
	  // console.log('name: %s and age: %d', result.rows[0]['id'], result.rows[0]['name']);
	  res.send(JSON.stringify(result.rows));
	});
});


router.get('/', function(req, res) {
	res.send(JSON.stringify({ a: 1 }));
});




// db.query("INSERT INTO basic_names(id, name) values(4, $1)", ['Test']);

if (process.env.NODE_ENV === 'production') {
	app.use(express.static('client/build'));
}

app.listen(app.get("port"), function () {
  console.log('Server running on http://localhost:' + app.get("port"))
})

app.use('/api', router);