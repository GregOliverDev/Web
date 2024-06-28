"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ProductController_1 = __importDefault(require("../controller/ProductController"));
const router = express_1.default.Router();
const controller = new ProductController_1.default();
router.post("/create", async (req, res) => {
    const response = await controller.create(req.body);
    return res.status(response === "OK" ? 200 : 400).send(response);
});
router.get("/getAll", async (req, res) => {
    const response = await controller.all();
    return res.status(response.error ? 400 : 200).send(response);
});
router.patch("/update", async (req, res) => {
    const response = await controller.update(req.body);
    return res.status(response.error ? 400 : 200).send(response);
});
router.delete("/delete/:id", async (req, res) => {
    const response = await controller.delete(req.params.id);
    return res.status(response.error ? 400 : 200).send(response);
});
router.get("/getProducts", async (req, res) => {
    const { registrationClient } = req.query;
    if (typeof registrationClient !== 'string') {
        return res.status(400).send({ error: "Invalid registrationClient parameter" });
    }
    const response = await controller.getProducts(registrationClient);
    return res.status(response.error ? 400 : 200).send(response);
});
router.patch("/updateStock", async (req, res) => {
    const response = await controller.updateStock(req.body);
    return res.status(response.error ? 400 : 200).send(response);
});
router.get("/getProduct", async (req, res) => {
    const { _id } = req.query;
    if (typeof _id !== 'string') {
        return res.status(400).send({ error: "Invalid _id parameter" });
    }
    const response = await controller.getProduct(_id);
    return res.status(response.error ? 400 : 200).send(response);
});
exports.default = router;
