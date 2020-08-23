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
    const { id } = req.body.token;
    const items: Items = await ItemService.findAll(id);

    res.status(200).json({ msg: "Successfully retrieved item", data: items });
  } catch (e) {
    res.status(404).json(e.message);
  }
});

// GET items/:id
itemsRouter.get("/:id", async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const { userId } = req.body.token;
  try {
    const item: Item = await ItemService.find(id, userId);

    res.status(200).json({ msg: "Successfully retrieved item", data: item });
  } catch (e) {
    res.status(404).json(e.message);
  }
});

// POST items/

itemsRouter.post("/", async (req: Request, res: Response) => {
  try {
    const item: Item = req.body;
    const { id } = req.body.token;

    const createdItem: Item = await ItemService.create(item, id);

    res.status(201).json({ msg: "Item created", data: createdItem });
  } catch (e) {
    res.status(404).json(e.message);
  }
});

// PUT items/

itemsRouter.put("/:id", async (req: Request, res: Response) => {
  try {
    const item: Item = req.body;
    const id: number = parseInt(req.params.id, 10);
    const { userId } = req.body.token;

    const updatedItem: Item = await ItemService.update(id, item, userId);

    res.status(200).json({ msg: "Item updated", data: updatedItem });
  } catch (e) {
    res.status(500).json(e.message);
  }
});

// DELETE items/:id

itemsRouter.delete("/:id", async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const { userId } = req.body.token;
    await ItemService.remove(id, userId);

    res.status(200).json({ msg: "Item deleted" });
  } catch (e) {
    res.status(500).json(e.message);
  }
});
