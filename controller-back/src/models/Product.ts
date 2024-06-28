import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    required: true,
    type: String,
  },
  stock: {
    required: true,
    type: Number,
  },
  price: {
    required: true,
    type: Number,
  },
  urlImg: {
    required: false,
    type: String,
  },
  registrationClient:{
    required: true,
    type: String,
  },
});

export const ProductModel = mongoose.model("Product", productSchema);
