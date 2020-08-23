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
export const findAll = async (id: string): Promise<Items> => {
  return db.manyOrNone(findAllItems, [id]);
};

export const find = async (id: number, userId: string): Promise<Item> => {
  const record: Item | null = await db.oneOrNone(findOneItem, [id, userId]);

  if (record) {
    return record;
  }

  throw new Error("No record found");
};

export const create = async (newItem: Item, id: string): Promise<Item> => {
  const { name, description, price, image } = newItem;
  const item: Item = await db.one(createItem, [
    name,
    price,
    description,
    image,
    id
  ]);
  return item;
};

export const update = async (
  itemId: number,
  updatedItem: Item,
  userId: string
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
    itemId,
    userId
  ]);
  return newItem;
};

export const remove = async (id: number, userId: string): Promise<void> => {
  await db.none(deleteItem, [id, userId]);
};
