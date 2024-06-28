import express, { Request, Response } from "express";
import ProductController from "../controller/ProductController";

const router = express.Router();
const controller = new ProductController();

router.post("/create", async (req: Request, res: Response) => {
  const response = await controller.create(req.body);

  return res.status(response === "OK" ? 200 : 400).send(response);
});

router.get("/getAll", async (req: Request, res: Response) => {
  const response = await controller.all();

  return res.status(response.error ? 400 : 200).send(response);
});

router.patch("/update", async (req: Request, res: Response) => {
  const response = await controller.update(req.body);

  return res.status(response.error ? 400 : 200).send(response);
});

router.delete("/delete/:id", async (req: Request, res: Response) => {
  const response = await controller.delete(req.params.id);

  return res.status(response.error ? 400 : 200).send(response);
});

router.get("/getProducts", async (req: Request, res: Response) => {
  const { registrationClient } = req.query;

  if (typeof registrationClient !== 'string') {
    return res.status(400).send({ error: "Invalid registrationClient parameter" });
  }

  const response = await controller.getProducts(registrationClient);
  return res.status(response.error ? 400 : 200).send(response);
});

router.patch("/updateStock", async (req: Request, res: Response) => {
  const response = await controller.updateStock(req.body);

  return res.status(response.error ? 400 : 200).send(response);
});

router.get("/getProduct", async (req: Request, res: Response) => {
  const { _id } = req.query;

  if (typeof _id !== 'string') {
    return res.status(400).send({ error: "Invalid _id parameter" });
  }

  const response = await controller.getProduct(_id);
  return res.status(response.error ? 400 : 200).send(response);
});


export default router;
