import { Body, Get, Post, Route, Tags, Query } from "tsoa";
import { JsonObject } from "swagger-ui-express";

import { InventoryModel } from "../models/Inventory";

@Route("api/inventory")
@Tags("Inventory")
export default class InventoryController {
  @Post("/create")
  public async create(
    @Body()
    body: {
      data: string;
      idProduct: string;
      quant: number;
      registrationClient: String;
    }
  ): Promise<string> {
    const data = new InventoryModel({
      data: body.data,
      idProduct: body.idProduct,
      quant: body.quant,
      registrationClient: body.registrationClient,
    });

    try {
      await data.save();
      return "OK";
    } catch (error) {
      return JSON.stringify(error);
    }
  }
  @Get("/getInventories")
  public async getInventories(
    @Query("registrationClient") registrationClient: string
  ): Promise<JsonObject> {
    try {
      const filter = { registrationClient: { $eq: registrationClient } };
      const data = await InventoryModel.find(filter);
      return data;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }
}
