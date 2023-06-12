import livros from "../models/Livro.js";

class LivroController {

  static listarLivros = async (req, res) => {
    try{
      const livrosResultado = await livros.find()
        .populate("autor")
        .exec();

      res.status(200).json(livrosResultado);
    }catch (err) {
      res.status(500).json({message: "erro interno no servidor"});
    }
  };

  static listarLivroPorId = async (req, res) => {
    try{
      const id = req.params.id;
      const resultado = await livros.findById(id)
        .populate("autor", "nome")
        .exec();
          
      res.status(200).send(resultado);
    } catch(err) {
      res.status(400).send({message: `${err.message} - Id do livro não localizado!`}); 
    }
  };

  static listarLivroPorEditora = async (req, res) => {
    try{
      const editora = req.query.editora;
      const resultado = await livros.find({"editora": editora});

      res.status(200).json(resultado);
    } catch(err) {
      res.status(500).json({message: "Erro interno no servidor!"});
    }
  };

  static cadastrarLivro = async (req, res) => {
    try{
      let livro = new livros(req.body);
      const resultado = await livro.save();

      res.status(201).json(resultado);
    } catch(err) {
      res.status(500).send({message: `${err.message} - falha ao cadastrar livro.`});
    }
  };

  static atualizarLivro = async (req, res) => {
    try{
      const id = req.params.id;
      const resultado = await livros.findByIdAndUpdate(id, {$set: req.body});

      res.status(200).json(resultado);
    } catch(err) {
      res.status(500).send({message: err.message});
    }
  };

  static excluirLivro = async (req, res) => {
    try{ 
      const id = req.params.id;
      await livros.findByIdAndDelete(id);

      res.status(200).send({message: "livro removido com sucesso!"});
    } catch(err) {
      res.status(500).send({message: err.message});
    }
  };

}

export default LivroController;