const express = require('express')
const app = express()
const port = 3000
const router = express.Router() //remove
const path = require('path')
const {TwingEnvironment, TwingLoaderFilesystem} = require('twing')

let loader = new TwingLoaderFilesystem(path.join(__dirname, 'views'))
let twing = new TwingEnvironment(loader)

//import Quagga from 'quagga'; // ES6
//const Quagga = require('quagga').default;

app.use(express.static('public'))
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'twing')

app.get('/', (req, res) => {
  twing.render('index.twig').then((output) => {
        res.end(output)
    });
})

app.get('/scan', (req, res) => {
  twing.render('scan.twig').then((output) => {
        res.end(output)
    });
})

app.get('/add', (req, res) => {
  res.send('Adding item')
})

app.get('/remove', (req, res) => {
  res.send('Removing item')
})

app.get('/view', (req, res) => {
  res.send('Viewing itemlist')
})

app.get('/shoppingList', (req, res) => {
  res.send('Shopping list')
})

app.get('/new', (req, res) => {
  res.send('Adding a new item')
})

module.exports = router //remove

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
