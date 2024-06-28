import express, { Request, Response } from "express";
import InventoryController from "../controller/InventoryController";

const router = express.Router();
const controller = new InventoryController();

router.post("/create", async (req: Request, res: Response) => {
  const response = await controller.create(req.body);

  return res.status(response === "OK" ? 200 : 400).send(response);
});

router.get("/getInventories", async (req: Request, res: Response) => {
  const { registrationClient } = req.query;

  if (typeof registrationClient !== 'string') {
    return res.status(400).send({ error: "Invalid registrationClient parameter" });
  }

  const response = await controller.getInventories(registrationClient);
  return res.status(response.error ? 400 : 200).send(response);
});


export default router;
