"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const swagger_ui_express_1 = __importDefault(require("swagger-ui-express"));
const database_1 = require("./data/database");
const cors_1 = __importDefault(require("cors"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const clientRoutes_1 = __importDefault(require("./routes/clientRoutes"));
const inventoryRoutes_1 = __importDefault(require("./routes/inventoryRoutes"));
const orderRoutes_1 = __importDefault(require("./routes/orderRoutes"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 4000;
const databaseUrl = process.env.DATABASE_URL || "";
(0, database_1.connect)(databaseUrl);
const corsOptions = {
    origin: ["http://localhost:3000", "*"],
};
app.use((0, cors_1.default)());
app.use(express_1.default.json());
app.use(express_1.default.static("public"));
app.use("/swagger", swagger_ui_express_1.default.serve, swagger_ui_express_1.default.setup(undefined, {
    swaggerOptions: {
        url: "/swagger.json",
    },
}));
app.use("/api/product", productRoutes_1.default);
app.use("/api/client", clientRoutes_1.default);
app.use("/api/inventory", inventoryRoutes_1.default);
app.use("/api/order", orderRoutes_1.default);
app.get("/", (req, res) => {
    res.send("My back ");
});
app.listen(port, () => {
    console.log(`Server Started at http://localhost:${port}/swagger/`);
});
