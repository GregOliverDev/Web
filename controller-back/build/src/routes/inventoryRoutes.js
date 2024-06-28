"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const InventoryController_1 = __importDefault(require("../controller/InventoryController"));
const router = express_1.default.Router();
const controller = new InventoryController_1.default();
router.post("/create", async (req, res) => {
    const response = await controller.create(req.body);
    return res.status(response === "OK" ? 200 : 400).send(response);
});
router.get("/getInventories", async (req, res) => {
    const { registrationClient } = req.query;
    if (typeof registrationClient !== 'string') {
        return res.status(400).send({ error: "Invalid registrationClient parameter" });
    }
    const response = await controller.getInventories(registrationClient);
    return res.status(response.error ? 400 : 200).send(response);
});
exports.default = router;
