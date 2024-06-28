"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const productSchema = new mongoose_1.default.Schema({
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
    registrationClient: {
        required: true,
        type: String,
    },
});
exports.ProductModel = mongoose_1.default.model("Product", productSchema);
