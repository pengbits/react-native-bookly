import express from 'express'

const app = express();
const PORT = 4000;

app.get('/', (req, res) => {
  res.send('hello there')
})

app.listen(PORT, () => {
  console.log(`listening on ${PORT}`)
})