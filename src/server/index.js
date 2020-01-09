import express from 'express'
import bodyParser from 'body-parser'
import cors from 'cors'
import db from './db'
const port = 3000
import ErrorHandler from './middleware/error-handler'
import AuthorRoutes from './routes/authors.routes'
const app = express()

app.use(bodyParser.json())
app.use(cors())
app.use('/authors', AuthorRoutes())
app.get('/', (req, res) => res.json({
  success: true,
  greeting: 'hola!'
})) 

app.use(ErrorHandler)
app.listen(port, () => console.log(`Example app listening on port ${port}!`))