"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrderModel = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const orderSchemas = new mongoose_1.default.Schema({
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
exports.OrderModel = mongoose_1.default.model("Order", orderSchemas);
