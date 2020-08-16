/**
 * Required External Modules and Interfaces
 */
import express, { Request, Response } from "express";
import * as ItemService from "./items.service";
import { Item } from "./item.interface";
import { Items } from "./items.interface";

/**
 * Router Definition
 */
export const itemsRouter = express.Router();

/**
 * Controller Definitions
 */

// GET items/
itemsRouter.get("/", async (req: Request, res: Response) => {
  try {
    const items: Items = await ItemService.findAll();

    res.status(200).json({msg: 'Successfully retrieved item', data: items});
  } catch (e) {
    res.status(404).send(e.message);
  }
});

// GET items/:id
itemsRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);

  try {
    const item: Item = await ItemService.find(id);

    res.status(200).json({msg: 'Successfully retrieved item', data: item});
  } catch (e) {
    res.status(404).send(e.message);
  }
});

// POST items/

itemsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const item: Item = req.body;

    const createdItem: Item = await ItemService.create(item);

    res.status(201).json({msg: 'Item created', data: createdItem});
  } catch (e) {
    res.status(404).send(e.message);
  }
});

// PUT items/

itemsRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const item: Item = req.body;
    const id: number = parseInt(req.params.id, 10);

    const updatedItem: Item = await ItemService.update(id, item);

    res.status(200).json({msg: 'Item updated', data: updatedItem});
  } catch (e) {
    res.status(500).send(e.message);
  }
});

// DELETE items/:id

itemsRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    await ItemService.remove(id);

    res.status(200).json({msg: 'Item deleted'});
  } catch (e) {
    res.status(500).send(e.message);
  }
});
