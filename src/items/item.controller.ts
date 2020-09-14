import { Request, Response } from "express";
import * as itemService from "./items.service";
import { Item } from "./item.interface";
import { Items } from "./items.interface";

const { create, find, findAll, remove, update } = itemService;

const createItem = async (req: Request, res: Response) => {
  try {
    const item: Item = req.body;
    const { id } = req.body.token;
    const createdItem: Item = await create(item, id);
    return res.status(201).json({ msg: "Item created", data: createdItem });
  } catch (e) {
    res.status(500).json(e.message);
  }
};

const editItem = async (req: Request, res: Response) => {
  try {
    const item: Item = req.body;
    const id: number = parseInt(req.params.id, 10);
    const { userId } = req.body.token;
    const updatedItem: Item = await update(id, item, userId);
    res.status(200).json({ msg: "Item updated", data: updatedItem });
  } catch (e) {
    res.status(500).json(e.message);
  }
};

const findAllItems = async (req: Request, res: Response) => {
  try {
    const { id } = req.body.token;
    const items: Items = await findAll(id);
    res.status(200).json({ msg: "Successfully retrieved item", data: items });
  } catch (e) {
    res.status(500).json(e.message);
  }
};

const findOneItem = async (req: Request, res: Response) => {
  const id: number = parseInt(req.params.id, 10);
  const { userId } = req.body.token;
  try {
    const item: Item = await find(id, userId);

    res.status(200).json({ msg: "Successfully retrieved item", data: item });
  } catch (e) {
    res.status(500).json(e.message);
  }
};

const deleteItem = async (req: Request, res: Response) => {
  try {
    const id: number = parseInt(req.params.id, 10);
    const { userId } = req.body.token;
    await remove(id, userId);
    res.status(200).json({ msg: "Item deleted" });
  } catch (e) {
    res.status(500).json(e.message);
  }
};

export { deleteItem, createItem, editItem, findAllItems, findOneItem };
