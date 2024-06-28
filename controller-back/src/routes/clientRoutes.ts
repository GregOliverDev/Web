import express, { Request, Response } from "express";
import ClientController from "../controller/ClientController";

const router = express.Router();
const controller = new ClientController();

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

router.get("/getClient", async (req: Request, res: Response) => {
  const { newRegistration } = req.query;

  if (typeof newRegistration !== 'string') {
    return res.status(400).send({ error: "Invalid newRegistration parameter" });
  }

  const response = await controller.getClient(newRegistration);
  return res.status(response.error ? 400 : 200).send(response);
});

export default router;
