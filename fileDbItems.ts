import { promises as fs} from 'fs';
import {randomUUID} from "crypto";
import {Item, ItemWithoutId} from "./types";

const pathName = './dbItems.json';
let data: Item[] = [];

const fileDbPlaces = {
    async init() {
        try {
            const fileContents = await fs.readFile(pathName);
            data = JSON.parse(fileContents.toString());
        } catch (e) {
            console.error(e);
            data = [];
        }
    },
    async getItems() {
        return data;
    },
    async addItem(el: ItemWithoutId) {
        const item = {
            ...el,
            id: randomUUID()
        };
        data.push(item);
        await this.save();
    },
    async save() {
        await fs.writeFile(pathName, JSON.stringify(data));
    },
    async delete(id: string) {
        const indexToDelete = data.findIndex(item => item.id === id);
        if (indexToDelete !== -1) {
            data.splice(indexToDelete, 1);
            await this.save();
        }
    }
};

export default fileDbPlaces;