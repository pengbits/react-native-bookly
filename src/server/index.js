import express from 'express'
import routes from './routes/AuthorRoutes'
import mongoose from 'mongoose'
import bodyParser from 'body-parser'

const app = express();
const PORT = 4000;
  
routes(app)
app.get('/', (req, res) => {
  res.send('hello there')
})

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})