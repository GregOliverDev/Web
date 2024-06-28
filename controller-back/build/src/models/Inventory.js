"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.InventoryModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const inventorySchema = new mongoose_1.default.Schema({
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
exports.InventoryModel = mongoose_1.default.model("inventory", inventorySchema);
