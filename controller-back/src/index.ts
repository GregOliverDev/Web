import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import swaggerUi from "swagger-ui-express";
import { connect } from "./data/database";
import cors from "cors";

import productRoutes from "./routes/productRoutes";
import clientRoutes from "./routes/clientRoutes";
import inventoryRoutes from "./routes/inventoryRoutes";
import orderRoutes from "./routes/orderRoutes";

dotenv.config();

const app: Express = express();
const port = process.env.PORT || 4000;
const databaseUrl = process.env.DATABASE_URL || "";
connect(databaseUrl);

const corsOptions = {
  origin: ["http://localhost:3000", "*"],
};

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(
  "/swagger",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  })
);

app.use("/api/product", productRoutes);
app.use("/api/client", clientRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/order", orderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("My back ");
});

app.listen(port, () => {
  console.log(`Server Started at http://localhost:${port}/swagger/`);
});
