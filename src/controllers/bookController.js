// import { author } from "../models/Author.js"
// import book from "../models/Book.js"
import prisma from "../prisma.js"

class BookController {
  static async listBooks(req, res) {
    try {
      const bookList = await prisma.books.findMany({
        include: {
          author: true
        }
      })
  
      res.status(200).json(bookList)
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha na requisicao` })
    }
  }

  static async listBookById(req, res) {
    const { id } = req.params

    try {
      const book = await prisma.books.findById(id)

      // !book && return res.status(404).json({ message: 'Book not found' })
  
      if (!book) return res.status(404).json({ message: 'Book not found' })
  
      return res.status(200).json(book)


      // const id = req.params.id
      // const foundBook = await books.findById(id)
  
      // res.status(200).json(foundBook)
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha na requisicao do livro` })
    }
  }

  static async registerBook(req, res) {
    const { title, editor, pages, price, author } = req.body
    try {
      const foundAuthor = await prisma.authors.findUnique(author.name)
      // const completeBook = { ...newBook, author: { ...foundAuthor._doc } }
      const createdBook = await prisma.books.create({
        data: {
          title,
          editor,
          pages,
          price,
          author: (foundAuthor !== null) ?  { ...foundAuthor } : { author }
        }
      }) 

      res.status(201).json({ message: "Livro Cirado!", book: createdBook })
    } catch (err) {
      res.status(500).json({ message: `${err.message} - falha ao cadastrar livro...` })
    }
  }

  static async updateBookById(req, res) {
    try {
      const id = req.params.id
      await books.findByIdAndUpdate(id, req.body)
  
      res.status(200).json({ message: 'Book updated successfully' })
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha na atualizacao do livro` })
    }
  }

  static async deleteBookById(req, res) {
    try {
      const id = req.params.id
      await books.findByIdAndDelete(id)

      res.status(200).json({ message: "Livro removido!" })
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha ao deletar livro` })
    }
  }

  static async listBooksByEditor(req, res) {
    const editor = req.query.editor

    try {
      const booksByEditor = await books.find({ editor: editor })

      res.status(200).json(booksByEditor)
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha na busca` })
    }
  }
}

export default BookController