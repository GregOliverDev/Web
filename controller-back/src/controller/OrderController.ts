import { Body, Get, Patch, Delete, Post, Route, Tags, Query } from "tsoa";
import { JsonObject } from "swagger-ui-express";
import ProductController from "./ProductController";
import { OrderModel } from "../models/Order";

@Route("api/order")
@Tags("Order")
export default class OrderController {
  @Post("/create")
  public async create(
    @Body()
    body: {
      numberOrder: number;
      registrationClient: string;
      strClientVend: string;
      priceVend: number;
      priceDesc: number;
      products: {
        idProduct: string;
        product: string;
        quant: number;
        price: number;
      }[];
    }
  ): Promise<string> {
    const data = new OrderModel({
      numberOrder: body.numberOrder,
      registrationClient: body.registrationClient,
      strClientVend: body.strClientVend,
      priceVend: body.priceVend,
      priceDesc: body.priceDesc,
      products: body.products,
    });

    try {
      await data.save();
      const productController = new ProductController();
      for (const product of body.products) {
        await productController.updateStockOrder({
          _id: product.idProduct,
          stock: -product.quant,
        });
      }

      return "OK";
    } catch (error) {
      return JSON.stringify(error);
    }
  }
  @Patch("/update")
  public async update(
    @Body()
    body: {
      id: number;
      priceVend: number;
      priceDesc: number;
      products: {
        idProduct: string;
        product: string;
        quant: number;
        price: number;
      }[];
    }
  ): Promise<JsonObject> {
    try {
      const result = await OrderModel.findByIdAndUpdate(body.id, {
        priceVend: body.priceVend,
        priceDesc: body.priceDesc,
        products: body.products,
      });
      return { result: result };
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }
  @Delete("/delete/:id")
  public async delete(id: string): Promise<JsonObject> {
    try {
      const data = await OrderModel.findByIdAndDelete(id);
      return { data: data };
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }
  @Get("/getOrders")
  public async getOrders(
    @Query("registrationClient") registrationClient: string
  ): Promise<JsonObject> {
    try {
      const filter = { registrationClient: { $eq: registrationClient } };
      const data = await OrderModel.find(filter);
      return data;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }
}
