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
    user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Users",
    required: true,
  },
  },
  { timestamps: true },
);

export default mongoose.model("product", productsShema);
