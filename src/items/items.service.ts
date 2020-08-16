/**
 * Data Model Interfaces
 */
import { Item } from "./item.interface";
import { Items } from "./items.interface";
import { db } from "../db/db-config";
import {
  findAllItems,
  findOneItem,
  createItem,
  updateItem,
  deleteItem
} from "../db/queries";

/**
 * Service Methods
 */
export const findAll = async (): Promise<Items> => {
  return db.manyOrNone(findAllItems);
};

export const find = async (id: number): Promise<Item> => {
  const record: Item | null = await db.oneOrNone(findOneItem, [id]);

  if (record) {
    return record;
  }

  throw new Error("No record found");
};

export const create = async (newItem: Item): Promise<Item> => {
  const { name, description, price, image } = newItem;
  const item: Item = await db.one(createItem, [
    name,
    price,
    description,
    image,
  ]);
  return item;
};

export const update = async (
  itemId: number,
  updatedItem: Item
): Promise<Item> => {
  const item: Item | null = await db.oneOrNone(findOneItem, [itemId]);
  if (!item) {
    throw new Error("No record found to update");
  }
  const editedItem: Item = { ...item, ...updatedItem };
  const { name, description, price, image } = editedItem;
  const newItem: Item = await db.one(updateItem, [
    name,
    price,
    description,
    image,
    itemId
  ]);
  return newItem;
};

export const remove = async (id: number): Promise<void> => {
  await db.none(deleteItem, [id]);
};
