import mongoose from "mongoose";

const orderSchemas = new mongoose.Schema({
  numberOrder: {
    required: true,
    type: Number,
  },
  registrationClient: {
    required: true,
    type: String,
  },
  strClientVend: {
    required: true,
    type: String,
  },
  priceVend: {
    required: true,
    type: Number,
  },
  priceDesc: {
    required: true,
    type: Number,
  },
  products: [
    {
      idProduct: {
        required: true,
        type: String,
      },
      product: {
        required: true,
        type: String,
      },
      quant: {
        required: true,
        type: Number,
      },
      price: {
        required: true,
        type: Number,
      },
    },
  ],
});
export const OrderModel = mongoose.model("Order", orderSchemas);
