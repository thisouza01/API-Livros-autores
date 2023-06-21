
import NaoEncontrado from "../erros/NaoEncontrado.js";
import {autores} from "../models/index.js";

class AutorController {

  static listarAutores = async (req, res, next) => {
    try {
      const autoresResultado = autores.find();

      req.resultado = autoresResultado;

      next();
    } catch(err) {
      next(err);
    }
    
  };

  static listarAutorPorId = async (req, res, next) => {
    try {
      const id = req.params.id;
      
      const autorResultado = await autores.findById(id);

      if(autorResultado !== null) {
        res.status(200).send(autorResultado);
      } else {
        next(new NaoEncontrado("Id não encontrado"));
      }
    } catch(err) {
      next(err); 
    }
  }; 

  static cadastrarAutor = async (req, res, next) => {
    try{
      let autor = new autores(req.body);

      const resultado = await autor.save();
      
      res.status(201).send(resultado.toJSON());
    }catch(err) {
      next(err);
    }
  };
   
  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      
      const autorAtualiza = await autores.findByIdAndUpdate(id, {$set: req.body});
      
      if(autorAtualiza !== null) {
        res.status(200).send({message: "autor foi atualizado com sucesso!", autorAtualiza});
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch(err) {
      next(err);
    }
  };

  static excluirAutor = async (req, res, next) => {
    try{
      const id = req.params.id;
      const resultado = await autores.findByIdAndDelete(id);
      
      if(resultado !== null) {
        res.status(200).send({message: "autor removido com sucesso!"});
      } else {
        next(new NaoEncontrado("Id do Autor não localizado."));
      }
    } catch(err) {
      next(err);
    }
    
  };
}

export default AutorController;