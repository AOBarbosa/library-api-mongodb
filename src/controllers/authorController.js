import { author } from "../models/Author.js"

class AuthorController {
  static async listAuthors(req, res) {
    try {
      const authorsList = await author.find({})
  
      res.status(200).json(authorsList)
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha na requisicao` })
    }
  }

  static async listAuthorById(req, res) {
    try {
      const id = req.params.id
      const foundAuthor = await author.findById(id)
  
      res.status(200).json(foundAuthor)
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha na requisicao do autor` })
    }
  }

  static async registerAuthor(req, res) {
    try {
      const newAuthor = await author.create(req.body)

      res.status(201).json({ message: "Autor Criado!", authors: newAuthor })
    } catch (err) {
      res.status(500).json({ message: `${err.message} - falha ao cadastrar autor...` })
    }
  }

  static async updateAuthorById(req, res) {
    try {
      const id = req.params.id
      await author.findByIdAndUpdate(id, req.body)
  
      res.status(200).json({ message: 'Author updated successfully' })
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha na atualizacao do autor` })
    }
  }

  static async deleteAuthorById(req, res) {
    try {
      const id = req.params.id
      await author.findByIdAndDelete(id)

      res.status(200).json({ message: "Autor removido!" })
    } catch (error) {
      res.status(500).json({ message: `${error.message} - falha ao deletar autor` })
    }
  }
}

export default AuthorController