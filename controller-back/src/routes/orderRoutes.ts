import express, { Request, Response } from "express";
import OrderController from "../controller/OrderController";

const router = express.Router();
const controller = new OrderController();

router.post("/create", async (req: Request, res: Response) => {
  const response = await controller.create(req.body);

  return res.status(response === "OK" ? 200 : 400).send(response);
});

router.patch("/update", async (req: Request, res: Response) => {
  const response = await controller.update(req.body);

  return res.status(response.error ? 400 : 200).send(response);
});

router.delete("/delete/:id", async (req: Request, res: Response) => {
  const response = await controller.delete(req.params.id);

  return res.status(response.error ? 400 : 200).send(response);
});

router.get("/getOrders", async (req: Request, res: Response) => {
  const { registrationClient } = req.query;

  if (typeof registrationClient !== 'string') {
    return res.status(400).send({ error: "Invalid registrationClient parameter" });
  }

  const response = await controller.getOrders(registrationClient);
  return res.status(response.error ? 400 : 200).send(response);
});


export default router;
