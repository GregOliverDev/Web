"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const tsoa_1 = require("tsoa");
const ProductController_1 = __importDefault(require("./ProductController"));
const Order_1 = require("../models/Order");
let OrderController = class OrderController {
    async create(body) {
        const data = new Order_1.OrderModel({
            numberOrder: body.numberOrder,
            registrationClient: body.registrationClient,
            strClientVend: body.strClientVend,
            priceVend: body.priceVend,
            priceDesc: body.priceDesc,
            products: body.products,
        });
        try {
            await data.save();
            const productController = new ProductController_1.default();
            for (const product of body.products) {
                await productController.updateStockOrder({
                    _id: product.idProduct,
                    stock: -product.quant,
                });
            }
            return "OK";
        }
        catch (error) {
            return JSON.stringify(error);
        }
    }
    async update(body) {
        try {
            const result = await Order_1.OrderModel.findByIdAndUpdate(body.id, {
                priceVend: body.priceVend,
                priceDesc: body.priceDesc,
                products: body.products,
            });
            return { result: result };
        }
        catch (error) {
            return {
                error: error.message,
            };
        }
    }
    async delete(id) {
        try {
            const data = await Order_1.OrderModel.findByIdAndDelete(id);
            return { data: data };
        }
        catch (error) {
            return {
                error: error.message,
            };
        }
    }
    async getOrders(registrationClient) {
        try {
            const filter = { registrationClient: { $eq: registrationClient } };
            const data = await Order_1.OrderModel.find(filter);
            return data;
        }
        catch (error) {
            return {
                error: error.message,
            };
        }
    }
};
__decorate([
    (0, tsoa_1.Post)("/create"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "create", null);
__decorate([
    (0, tsoa_1.Patch)("/update"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "update", null);
__decorate([
    (0, tsoa_1.Delete)("/delete/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "delete", null);
__decorate([
    (0, tsoa_1.Get)("/getOrders"),
    __param(0, (0, tsoa_1.Query)("registrationClient")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], OrderController.prototype, "getOrders", null);
OrderController = __decorate([
    (0, tsoa_1.Route)("api/order"),
    (0, tsoa_1.Tags)("Order")
], OrderController);
exports.default = OrderController;
