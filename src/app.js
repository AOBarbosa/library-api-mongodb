import express from "express"
import connectToDataBase from "./config/dbConnect.js"
import routes from "./routes/index.js"

const connection = await connectToDataBase()

connection.on('error', (err) => {
  console.error(err)
})

connection.once('open', () => {
  console.log('✅ Suscesfully connected')
})

const app = express()
routes(app)

app.delete('/books/:id', (req, res) => {
  const index = searchBook(req.params.id)

  books.splice(index, 1)

  res.status(200).send("Livro removido!")
})

export default app

