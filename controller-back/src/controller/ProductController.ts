import { Body, Get, Patch, Delete, Post, Route, Tags, Query } from "tsoa";
import { JsonObject } from "swagger-ui-express";

import { ProductModel } from "../models/Product";

@Route("api/product")
@Tags("Product")
export default class ProductController {
  @Post("/create")
  public async create(
    @Body()
    body: {
      name: string;
      stock: number;
      price: number;
      urlImg: string;
      registrationClient: string;
    }
  ): Promise<string> {
    const data = new ProductModel({
      name: body.name,
      stock: body.stock,
      price: body.price,
      urlImg: body.urlImg,
      registrationClient: body.registrationClient,
    });

    try {
      await data.save();
      return "OK";
    } catch (error) {
      return JSON.stringify(error);
    }
  }
  @Get("/getAll")
  public async all(): Promise<JsonObject> {
    try {
      const data = await ProductModel.find();
      return data;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }
  @Patch("/Update")
  public async update(
    @Body()
    body: {
      _id: string;
      name: string;
      stock: number;
      price: number;
      urlImg: string;
    }
  ): Promise<JsonObject> {
    try {
      const result = await ProductModel.findByIdAndUpdate(body._id, {
        name: body.name,
        stock: body.stock,
        price: body.price,
        urlImg: body.urlImg,
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
      const data = await ProductModel.findByIdAndDelete(id);
      return { data: data };
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }
  @Get("/getProducts")
  public async getProducts(
    @Query("registrationClient") registrationClient: string
  ): Promise<JsonObject> {
    try {
      const filter = { registrationClient: { $eq: registrationClient } };
      const data = await ProductModel.find(filter);
      return data;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }
  @Patch("/UpdateStock")
  public async updateStock(
    @Body()
    body: {
      _id: string;
      stock: number;
    }
  ): Promise<JsonObject> {
    try {
      const result = await ProductModel.findByIdAndUpdate(body._id, {
        stock: body.stock,
      });
      return { result: result };
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }
  
  @Patch("/UpdateStockOrder")
  public async updateStockOrder(
    @Body()
    body: {
      _id: string;
      stock: number;
    }
  ): Promise<JsonObject> {
    try {
      const result = await ProductModel.findByIdAndUpdate(body._id, {
        $inc: { stock: body.stock },
      });
      return { result: result };
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }

  @Get("/getProduct")
  public async getProduct(@Query("_id") _id: string): Promise<JsonObject> {
    try {
      const filter = { _id: { $eq: _id } };
      const data = await ProductModel.find(filter);
      return data;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }
}
