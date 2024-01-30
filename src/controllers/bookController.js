import { author } from "../models/Author.js"
import book from "../models/Book.js"

class BookController {
  static async listBooks(req, res) {
    try {
      const bookList = await book.find({})
  
      res.status(200).json(bookList)
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha na requisicao` })
    }
  }

  static async listBookById(req, res) {
    try {
      const id = req.params.id
      const foundBook = await book.findById(id)
  
      res.status(200).json(foundBook)
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha na requisicao do livro` })
    }
  }

  static async registerBook(req, res) {
    const newBook = req.body
    try {
      const founAuthor = await author.findById(newBook.author)
      const completeBook = { ...newBook, author: { ...founAuthor._doc } }
      const createdBook = await book.create(completeBook)

      res.status(201).json({ message: "Livro Cirado!", book: createdBook })
    } catch (err) {
      res.status(500).json({ message: `${err.message} - falha ao cadastrar livro...` })
    }
  }

  static async updateBookById(req, res) {
    try {
      const id = req.params.id
      await book.findByIdAndUpdate(id, req.body)
  
      res.status(200).json({ message: 'Book updated successfully' })
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha na atualizacao do livro` })
    }
  }

  static async deleteBookById(req, res) {
    try {
      const id = req.params.id
      await book.findByIdAndDelete(id)

      res.status(200).json({ message: "Livro removido!" })
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha ao deletar livro` })
    }
  }

  static async listBooksByEditor(req, res) {
    const editor = req.query.editor

    try {
      const booksByEditor = await book.find({ editor: editor })

      res.status(200).json(booksByEditor)
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha na busca` })
    }
  }
}

export default BookController