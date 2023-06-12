import autores from "../models/Autor.js";

class AutorController {

  static listarAutores = async (req, res) => {
    try {
      const autoresResultado = await autores.find();

      res.status(200).json(autoresResultado);
    } catch(err) {
      res.status(500).json({message: "erro interno no servidor"});
    }
    
  };

  static listarAutorPorId = async (req, res) => {
    try {
      const id = req.params.id;
      
      const autorResultado = await autores.findById(id);
      res.status(200).send(autorResultado);
    } catch(err) {
      res.status(500).json({message: "erro - Id não encontrado"});
    }
  }; 

  static cadastrarAutor = (req, res) => {
    try{
      let autor = new autores(req.body);
      autor.save();
      res.status(201).send(autor.toJSON());
    }catch(err) {
      res.status(500).send({message: `${err.message} - falha ao cadastrar autor.`});
    }
  };
   
  static atualizarAutor = async (req, res) => {
    try {
      const id = req.params.id;
      
      const autorAtualiza = await autores.findByIdAndUpdate(id, {$set: req.body});
      res.status(200).send({message: "autor foi atualizado com sucesso!", autorAtualiza});
    } catch(err) {
      res.status(500).send({messagen: err.message});
    }
  };

  static excluirAutor = async (req, res) => {
    try{
      const id = req.params.id;
      
      await autores.findByIdAndDelete(id);
      res.status(200).send({message: "autor removido com sucesso!"});
    } catch(err) {
      res.status(500).send({message: err.message});
    }
    
  };
}

export default AutorController;