const express = require('express')
const bodyParser = require('body-parser')
const bcrypt = require('bcrypt-nodejs')
const cors = require('cors')
const knex = require('knex')

const register = require('./controllers/register')
const signin = require('./controllers/signin')
const profile = require('./controllers/profile')
const image = require('./controllers/image')

const db = knex({
  client: 'pg',
  connection: {
    host: process.env.DATABASE_URL,
    ssl: true
  }
})

db.select('*').from('users')
const app = express()

app.use(bodyParser.json())
app.use(cors())

app.get('/', (req, res) => {
  res.send('it is working')
})

app.post('/signin', (req, res) => {
  signin.handleSignin(req, res, db, bcrypt)
})

app.post('/register', (req, res) => {
  register.handleRegister(req, res, db, bcrypt)
})

app.get('/profile/:id', (req, res) => {
  profile.handleProfile(req, res, db)
})

app.put('/image', (req, res) => {
  image.handleImage(req, res, db)
})
app.post('/imageurl', (req, res) => {
  image.handleApiCall(req, res)
})

const PORT = process.env.PORT
app.listen(PORT || 3000, () => {
  console.log(`=== App is successfully running at ${PORT} ===`)
})

/*
/signin --> post = success/fail
/register --> POST = user
/profile/:userId --> GET = user
/image --> PUT ==> user
*/
