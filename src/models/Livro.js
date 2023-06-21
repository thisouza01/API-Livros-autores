import mongoose from "mongoose";
import autopopulate from "mongoose-autopopulate";

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
      required: [true, "O autor(a) é obrigatorio"],
      autopopulate: { select: "nome" }
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
      validate: {
        validator: (valor) => {
          return valor >= 10 && valor <= 5000;
        },
        message: "O número de páginas deve estar entre 10 e 5000. Valor forneceido: {VALUE}"
      }

    }
  }
);

livroSchema.plugin(autopopulate);
const livros= mongoose.model("livros", livroSchema);

export default livros;