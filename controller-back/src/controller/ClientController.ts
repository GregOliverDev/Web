import { Body, Get, Patch, Delete, Post, Route, Tags, Query } from "tsoa";
import { JsonObject } from "swagger-ui-express";

import { ClientModel } from "../models/Client";

@Route("api/client")
@Tags("Client")
export default class ClientController {
  @Post("/create")
  public async create(
    @Body()
    body: {
      registration: string;
      email: string;
      password: string;
      type: string;
      themeSelect: number;
    }
  ): Promise<string> {
    const data = new ClientModel({
      registration: body.registration,
      email: body.email,
      password: body.password,
      type: body.type,
      themeSelect: body.themeSelect,
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
      const data = await ClientModel.find();
      return data;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }
  @Patch("/update")
  public async update(
    @Body()
    body: {
      id: string;
      password: string;
      themeSelect: number;
    }
  ): Promise<JsonObject> {
    try {
      const result = await ClientModel.findByIdAndUpdate(body.id, {
        password: body.password,
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
      const data = await ClientModel.findByIdAndDelete(id);
      return { data: data };
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }
  @Get("/getClient")
  public async getClient(
    @Query("newRegistration") newRegistration: string
  ): Promise<JsonObject> {
    try {
      const filter = { registration: { $eq: newRegistration } };
      const data = await ClientModel.find(filter);
      return data;
    } catch (error: any) {
      return {
        error: error.message,
      };
    }
  }
}
