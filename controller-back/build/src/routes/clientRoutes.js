"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const ClientController_1 = __importDefault(require("../controller/ClientController"));
const router = express_1.default.Router();
const controller = new ClientController_1.default();
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
router.get("/getClient", async (req, res) => {
    const { newRegistration } = req.query;
    if (typeof newRegistration !== 'string') {
        return res.status(400).send({ error: "Invalid newRegistration parameter" });
    }
    const response = await controller.getClient(newRegistration);
    return res.status(response.error ? 400 : 200).send(response);
});
exports.default = router;
