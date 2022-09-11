import * as fs from "fs";
import * as path from "path";
import { TodoItem } from "./dto";

/**
 * Sample service interface: get all todo items
 */
export interface GetItemsService {
  get(): TodoItem[]
}

/**
 * Sample service implementation: get all todo items from a json file.
 */
export class DefaultGetPriceService implements GetItemsService {
  get(): TodoItem[] {
    const jsonPath = path.join(__dirname, "/items.json");
    console.log(jsonPath);
    const json = fs.readFileSync(jsonPath).toString();
    
    return JSON.parse(json) as TodoItem[];
  }
}

/**
 * Sample service implementation: always throw an error.
 */
export class AlwaysErrorGetPriceService implements GetItemsService {
  get(): TodoItem[] {
    throw new Error("Error from service...");
  }
}
