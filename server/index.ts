import express from 'express'
import path from 'path'

const app = express()
const port = 3000

const DIR_PATH = path.resolve(__dirname, '../dist')


app.use(express.static(DIR_PATH))

app.get('/*', (req, res) => {
  res.sendFile(path.join(DIR_PATH, 'index.html'))
})

app.listen(port, () => {
  console.log(`App listening on port ${port}`)
})
