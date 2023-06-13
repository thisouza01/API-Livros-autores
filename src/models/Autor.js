import mongoose from "mongoose";

const autorSchema = new mongoose.Schema(
  {
    id: {type: String},
    nome: {
      type: String,
      required: [true, "nome do(a) autor(a) é requerido!"]
    },
    nacionalidade: {type: String}
  },
  {
    versionKey: false   // Versiona meus modelos
  }
);

const autores = mongoose.model("autores", autorSchema);

export default autores;