const express = require('express')
const app = express()
const port = 3000
const router = express.Router() //remove
const path = require('path')
const {TwingEnvironment, TwingLoaderFilesystem} = require('twing') //Requiring the twing libarby
const bodyParser = require('body-parser') //Parser for POST requests of the frontend
const mysql = require('mysql')

//Setting the location of the views for the twigfiles
let loader = new TwingLoaderFilesystem(path.join(__dirname, 'views'))
let twing = new TwingEnvironment(loader)

//Setup of Express
app.use(express.static('public')) //Defining public serve folder
app.set('views', path.join(__dirname, 'views')) //Viewfolder
app.set('view engine', 'twing') //Definining engine for rendering views
app.use(bodyParser.urlencoded({ extended: true })) //Accepting URL encoded data

//Setting connection data for MySQL DB
var connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '12345678',
  database: 'IoT_Inventory'
})

//Connecting to the database
connection.connect(error => {
  if (error) throw error;
  console.log("Successfully connected to the database.");
});

app.get('/', (req, res) => {
  twing.render('index.twig').then((output) => {
    res.end(output)
  })
})

app.get('/scan', (req, res) => {
  twing.render('scan.twig').then((output) => {
    res.end(output)
  })
})

//Post request to check if an EAN already exists in the DB
app.post('/checkEAN', (req, res) => {
    console.log('Got body:', req.body)
    connection.query('SELECT * FROM items WHERE ean="' + req.body.ean + '"', function (err, rows, fields) {
      if (err) throw err
      console.log('The solution is: ', rows.length)
      if(rows.length > 0) {
        res.send("exists")
      } else {
        res.send("new")
      }
    })
});

//Page with the form to update an existing item
app.get('/update/:id', (req, res) => {
  twing.render('update.twig',{ean:req.params.id}).then((output) => {
    res.end(output)
  })
})

//Page to add a completely new item
app.get('/new/:id', (req, res) => {
  twing.render('newItem.twig',{ean:req.params.id}).then((output) => {
    res.end(output)
  })
})

app.post('/new', (req, res) => {
    console.log('Got body:', req.body)
    let sqlStatement
    let formData = Object.entries(req.body)
    sqlStatement = "INSERT INTO items ("
    formData.forEach(ele => {
      sqlStatement += (ele[0] + ",")
    })
    sqlStatement = sqlStatement.slice(0, -1)
    sqlStatement += ") VALUES ("
    formData.forEach(ele => {
      sqlStatement += ("'" + ele[1] + "',")
    })
    sqlStatement = sqlStatement.slice(0, -1)
    sqlStatement += ")"

    console.log(sqlStatement)
    connection.query(sqlStatement, function (err, rows, fields) {
      if (err) throw err
      res.send("OK")
    })
});

app.get('/view', (req, res) => {
  res.send('Viewing itemlist')
})

app.get('/shoppingList', (req, res) => {
  res.send('Shopping list')
})

//connection.end()

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
