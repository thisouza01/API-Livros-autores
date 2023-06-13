/* eslint-disable no-unused-vars */
import mongoose from "mongoose";

function manipuladorDeErros(err, req, res, next) {
  console.log(err); // imprime o erro para o desenvolvedor

  if(err instanceof mongoose.Error.CastError) {
    res.status(400).send({message: "Um ou mais dados fornecidos estao incorretos"});
  } else if(err instanceof mongoose.Error.ValidationError) {
    const mensagensErro = Object.values(err.errors)
      .map(err => err.message)
      .join("; ");

    res.status(400).send({message: `Os seguintes erros foram encontrados: ${mensagensErro}`});
  } else {
    res.status(500).send({message: "Erro interno de servidor"});
  }
}

export default manipuladorDeErros;
