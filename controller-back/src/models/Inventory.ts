import mongoose from "mongoose";

const inventorySchema = new mongoose.Schema({
  data: {
    required: true,
    type: String,
  },
  idProduct: {
    required: true,
    type: String,
  },
  quant: {
    required: true,
    type: Number,
  },
  registrationClient: {
    required: true,
    type: String,
  },
});

export const InventoryModel = mongoose.model("inventory", inventorySchema);
