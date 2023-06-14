import mongoose from "mongoose";

const livroSchema = new mongoose.Schema(
  {
    id: {type: String},
    titulo: {
      type: String,
      required: [true, "O titulo do livro é obrigatório"]
    },
    autor: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "autores",
      required: [true, "O autor(a) é obrigatorio"]
    },
    editora: {
      type: String,
      required: [true, "A editora é obrigatória"],
      enum: {
        values: ["Gojos", "Alura"],
        message: "A editora {VALUE}, não é um valor permitido"
      }
    },
    numeroDePaginas: {
      type: Number,
      min: [10, "o número de páginas deve estar entre 10 e 5000, Valor fornecido: {VALUE}"],
      max: [5000, "o número de páginas deve estar entre 10 e 5000, Valor fornecido: {VALUE}"]

    }
  }
);

const livros= mongoose.model("livros", livroSchema);

export default livros;