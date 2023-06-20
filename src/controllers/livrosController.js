import NaoEncontrado from "../erros/NaoEncontrado.js";
import {autores, livros} from "../models/index.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try{
      const livrosResultado = await livros.find()
        .populate("autor")
        .exec();

      res.status(200).json(livrosResultado);
    }catch (err) {
      next(err);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try{
      const id = req.params.id;
      const resultado = await livros.findById(id)
        .populate("autor", "nome")
        .exec();

      if(resultado !== null) {
        res.status(200).send(resultado);
      } else {
        next(new NaoEncontrado("Id do Livro não localizado."));
      }
    } catch(err) {
      next(err); 
    }
  };

  static listarLivroPorFiltro = async (req, res, next) => {
    try{
      const busca = await processaBusca(req.query);

      const resultado = await livros
        .find(busca)
        .populate("autor");

      res.status(200).json(resultado);
    } catch(err) {
      next(err);
    }
  };

  static cadastrarLivro = async (req, res, next) => {
    try{
      let livro = new livros(req.body);
      const resultado = await livro.save();

      res.status(201).json(resultado);
    } catch(err) {
      next(err);
    }
  };

  static atualizarLivro = async (req, res, next) => {
    try{
      const id = req.params.id;
      const resultado = await livros.findByIdAndUpdate(id, {$set: req.body});

      if(resultado !== null) {
        res.status(200).json(resultado);
      } else {
        next(new NaoEncontrado("Id do Livro não localizado."));
      }
    } catch(err) {
      next(err);
    }
  };

  static excluirLivro = async (req, res, next) => {
    try{ 
      const id = req.params.id;
      const resultado = await livros.findByIdAndDelete(id);

      if(resultado !== null) {
        res.status(200).send({message: "livro removido com sucesso!"});
      } else {
        next(new NaoEncontrado("Id do Livro não localizado."));
      }
    } catch(err) {
      next(err);
    }
  };

}

async function processaBusca(parametros) {
  const { editora, titulo, minPaginas, maxPaginas, nomeAutor } = parametros;

  const busca = {};

  if(editora) busca.editora = editora;
  if(titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if(minPaginas || maxPaginas) busca.numeroDePaginas = {}; // inicia como objeto vazio

  if(minPaginas) busca.numeroDePaginas.$gte = minPaginas; // Para ficar mais dinâminco e nao reescrever sobre o segundo parâmetro
  if(maxPaginas) busca.numeroDePaginas.$lte = maxPaginas;

  if(nomeAutor) {
    const autor = await autores.findOne({ nome: nomeAutor });

    const autorId = autor._id;

    busca.autor = autorId;
  }

  return busca;
}

export default LivroController;