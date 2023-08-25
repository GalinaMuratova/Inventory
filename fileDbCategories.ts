import { promises as fs} from 'fs';
import {randomUUID} from "crypto";
import {Category, CategoryWithoutId} from "./types";

const pathName = './dbCategories.json';

let data: Category[] = [];

const fileDbCategories = {
    async init () {
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
    async addItem(item: CategoryWithoutId) {
        const post = {
            ...item,
            id: randomUUID()
        };
        data.push(post);
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
}

export default fileDbCategories;