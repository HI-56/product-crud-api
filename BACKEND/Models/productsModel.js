import mongoose from "mongoose";
const productsShema = new mongoose.Schema(
  {
    name: {
      type: String,
    },
    category: {
      type: String,
      required: true,
    },
    price: Number,
    stock: Number,
    status: {
      type: String,
    },
  },
  { timestamps: true },
);

export default mongoose.model("product", productsShema);
