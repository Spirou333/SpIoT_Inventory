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

app.use((req, res, next)=>{
  twing.render('404.twig').then((output) => {
    res.status(404).end(output)
  })
});

app.get('/', (req, res) => {
  twing.render('index.twig').then((output) => {
    res.end(output)
  })
})

app.get('/scan', (req, res) => {
  twing.render('scanItem.twig').then((output) => {
    res.end(output)
  })
})

//Post request to check if an EAN already exists in the DB
app.post('/checkEAN', (req, res) => {
    console.log('Got scan:', req.body)
    connection.query('SELECT * FROM items WHERE ean="' + req.body.ean + '"', function (err, rows, fields) {
      if (err) throw err
      if(rows.length > 0) {
        res.send("exists") //If rows are present the item already exists
      } else {
        res.send("new") //Otherwise it has to be registered
      }
    })
});

//Page with the form to update an existing item
app.get('/update/:id', (req, res) => {
  //Getting quantity from DB entry with this ean
  let sqlStatement = "SELECT quantity FROM items WHERE ean='" + req.params.id + "'"
  connection.query(sqlStatement, function (err, rows, fields) {
    if (err) throw err
    if(rows.length > 0) {
      let quantity = rows[0].quantity
      //If quantity is not set, it gets assumed the inventory is 0
      if(quantity === null || quantity === undefined) {
        quantity = 0
      }
      twing.render('updateItem.twig',{ean:req.params.id,quantity:quantity}).then((output) => {
        res.end(output)
      })
    }
  })
})

//Page to add a completely new item
app.get('/new/:id', (req, res) => {
  twing.render('newItem.twig',{ean:req.params.id}).then((output) => {
    res.end(output)
  })
})

app.post('/new', (req, res) => {
    let sqlStatement = "INSERT INTO items ("
    let formData = Object.entries(req.body) //Making the JSON Object into an array
    //Getting the keys that have the same name as the columns in the db
    formData.forEach(ele => {
      sqlStatement += (ele[0] + ",")
    })
    sqlStatement = sqlStatement.slice(0, -1) //Removing last comma
    sqlStatement += ") VALUES ("
    //Adding the values of these keys
    formData.forEach(ele => {
      sqlStatement += ("'" + ele[1] + "',")
    })
    sqlStatement = sqlStatement.slice(0, -1)
    sqlStatement += ")"

    connection.query(sqlStatement, function (err, rows, fields) {
      if (err) throw err
      res.send("OK")
    })
})

//Updating the quantity of the item
app.post('/updateQuantity', (req, res) => {
  let sqlStatement = "UPDATE items SET quantity='" + req.body.quantity + "' WHERE ean='" + req.body.ean + "'"
  connection.query(sqlStatement, function (err, rows, fields) {
    if (err) throw err
    res.send("OK")
  })
})

app.get('/itemList', (req, res) => {
  let sqlStatement = "SELECT ean,itemName,type,quantity,favorite FROM items"
  connection.query(sqlStatement, function (err, rows, fields) {
    if (err) throw err
    res.send(rows)
  })
})

app.get('/view', (req, res) => {
  twing.render('viewItemList.twig').then((output) => {
    res.end(output)
  })
})

app.get('/viewItem/:id', (req, res) => {
  let sqlStatement = "SELECT * FROM items WHERE ean='" + req.params.id + "'"
  connection.query(sqlStatement, function (err, rows, fields) {
    if (err) throw err
    let favoriteStatus
    if(rows[0].favorite == 0) {
      favoriteStatus = "No"
    } else {
      favoriteStatus = "Yes"
    }

    twing.render('viewItem.twig',{
      ean:req.params.id,
      itemName:rows[0].itemName,
      type:rows[0].type,
      size:rows[0].size,
      favorite:favoriteStatus,
      usualPrice:rows[0].usualPrice,
      minimumQuantity:rows[0].minimumQuantity,
      quantity:rows[0].quantity
    }).then((output) => {
      res.end(output)
    })
  })
})

app.post('/brand' (req, res) => {

})

app.get('/brands', (req, res) => {
  twing.render('brands.twig').then((output) => {
    res.end(output)
  })
})

app.post('/store' (req, res) => {

})

app.get('/stores', (req, res) => {
  twing.render('stores.twig').then((output) => {
    res.end(output)
  })
})

app.get('/shoppingList', (req, res) => {
  res.send('Shopping list')
})

//connection.end()

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
