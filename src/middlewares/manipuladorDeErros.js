/* eslint-disable no-unused-vars */
import mongoose from "mongoose";

function manipuladorDeErros(err, req, res, next) {
  if(err instanceof mongoose.Error.CastError) {
    res.status(400).send({message: "Um ou mais dados fornecidos estao incorretos"});
  } else {
    res.status(500).send({message: "Erro interno de servidor"});
  }
}

export default manipuladorDeErros;