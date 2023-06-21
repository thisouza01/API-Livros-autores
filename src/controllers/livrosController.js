import NaoEncontrado from "../erros/NaoEncontrado.js";
import {autores, livros} from "../models/index.js";

class LivroController {

  static listarLivros = async (req, res, next) => {
    try{
      const buscaLivros = livros.find();

      req.resultado = buscaLivros;

      next();
    }catch (err) {
      next(err);
    }
  };

  static listarLivroPorId = async (req, res, next) => {
    try{
      const id = req.params.id;
      const resultado = await livros
        .findById(id, {}, {autopopulate: false})
        .populate("autor");


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

      if(busca !== null) {
        const resultado = livros
          .find(busca);

        req.resultado = resultado;
  
        next();
      } else {
        res.status(200).send([]);
      }

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

  let busca = {};

  if(editora) busca.editora = editora;
  if(titulo) busca.titulo = { $regex: titulo, $options: "i" };

  if(minPaginas || maxPaginas) busca.numeroDePaginas = {}; // inicia como objeto vazio

  if(minPaginas) busca.numeroDePaginas.$gte = minPaginas; // Para ficar mais dinâminco e nao reescrever sobre o segundo parâmetro
  if(maxPaginas) busca.numeroDePaginas.$lte = maxPaginas;

  if(nomeAutor) {
    const autor = await autores.findOne({ nome: nomeAutor });

    if(autor !== null) {
      busca.autor = autor._id;
    } else {
      busca = null;
    }

  }

  return busca;
}

export default LivroController;