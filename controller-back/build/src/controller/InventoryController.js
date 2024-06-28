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
const Inventory_1 = require("../models/Inventory");
let InventoryController = class InventoryController {
    async create(body) {
        const data = new Inventory_1.InventoryModel({
            data: body.data,
            idProduct: body.idProduct,
            quant: body.quant,
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
    async getInventories(registrationClient) {
        try {
            const filter = { registrationClient: { $eq: registrationClient } };
            const data = await Inventory_1.InventoryModel.find(filter);
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
], InventoryController.prototype, "create", null);
__decorate([
    (0, tsoa_1.Get)("/getInventories"),
    __param(0, (0, tsoa_1.Query)("registrationClient")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InventoryController.prototype, "getInventories", null);
InventoryController = __decorate([
    (0, tsoa_1.Route)("api/inventory"),
    (0, tsoa_1.Tags)("Inventory")
], InventoryController);
exports.default = InventoryController;
