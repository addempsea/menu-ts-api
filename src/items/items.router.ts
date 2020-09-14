/**
 * Required External Modules and Interfaces
 */
import express from "express";
import * as ItemController from "./item.controller";

const {
  deleteItem,
  createItem,
  editItem,
  findAllItems,
  findOneItem,
} = ItemController;
/**
 * Router Definition
 */
export const itemsRouter = express.Router();

// GET items/
itemsRouter.get("/", findAllItems);

// GET items/:id
itemsRouter.get("/:id", findOneItem);

// POST items/
itemsRouter.post("/", createItem);

// PUT items/
itemsRouter.put("/:id", editItem);

// DELETE items/:id
itemsRouter.delete("/:id", deleteItem);
