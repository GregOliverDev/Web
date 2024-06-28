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
Object.defineProperty(exports, "__esModule", { value: true });
const tsoa_1 = require("tsoa");
const Product_1 = require("../models/Product");
let ProductController = class ProductController {
    async create(body) {
        const data = new Product_1.ProductModel({
            name: body.name,
            stock: body.stock,
            price: body.price,
            urlImg: body.urlImg,
            registrationClient: body.registrationClient,
        });
        try {
            await data.save();
            return "OK";
        }
        catch (error) {
            return JSON.stringify(error);
        }
    }
    async all() {
        try {
            const data = await Product_1.ProductModel.find();
            return data;
        }
        catch (error) {
            return {
                error: error.message,
            };
        }
    }
    async update(body) {
        try {
            const result = await Product_1.ProductModel.findByIdAndUpdate(body._id, {
                name: body.name,
                stock: body.stock,
                price: body.price,
                urlImg: body.urlImg,
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
            const data = await Product_1.ProductModel.findByIdAndDelete(id);
            return { data: data };
        }
        catch (error) {
            return {
                error: error.message,
            };
        }
    }
    async getProducts(registrationClient) {
        try {
            const filter = { registrationClient: { $eq: registrationClient } };
            const data = await Product_1.ProductModel.find(filter);
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
], ProductController.prototype, "create", null);
__decorate([
    (0, tsoa_1.Get)("/getAll"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "all", null);
__decorate([
    (0, tsoa_1.Patch)("/Update"),
    __param(0, (0, tsoa_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "update", null);
__decorate([
    (0, tsoa_1.Delete)("/delete/:id"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "delete", null);
__decorate([
    (0, tsoa_1.Get)("/getProducts"),
    __param(0, (0, tsoa_1.Query)("registrationClient")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductController.prototype, "getProducts", null);
ProductController = __decorate([
    (0, tsoa_1.Route)("api/product"),
    (0, tsoa_1.Tags)("Product")
], ProductController);
exports.default = ProductController;
