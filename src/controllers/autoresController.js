
import autores from "../models/Autor.js";

class AutorController {

  static listarAutores = async (req, res, next) => {
    try {
      const autoresResultado = await autores.find();

      res.status(200).json(autoresResultado);
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
        res.status(404).json({message: "erro - Id não encontrado"});
      }
    } catch(err) {
      next(err); 
    }
  }; 

  static cadastrarAutor = (req, res, next) => {
    try{
      let autor = new autores(req.body);
      autor.save();
      res.status(201).send(autor.toJSON());
    }catch(err) {
      next(err);
    }
  };
   
  static atualizarAutor = async (req, res, next) => {
    try {
      const id = req.params.id;
      
      const autorAtualiza = await autores.findByIdAndUpdate(id, {$set: req.body});
      res.status(200).send({message: "autor foi atualizado com sucesso!", autorAtualiza});
    } catch(err) {
      next(err);
    }
  };

  static excluirAutor = async (req, res, next) => {
    try{
      const id = req.params.id;
      
      await autores.findByIdAndDelete(id);
      res.status(200).send({message: "autor removido com sucesso!"});
    } catch(err) {
      next(err);
    }
    
  };
}

export default AutorController;