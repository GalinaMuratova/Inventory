import express from "express";
import fileDbItems from "../fileDbItems";
import {imagesUpload} from "../multer";
import {ItemWithoutId} from "../types";
import fileDbCategories from "../fileDbCategories";
import fileDbPlaces from "../fileDbPlaces";
const itemsRouter = express.Router();

itemsRouter.get('/', async (req, res) => {
    const items = await fileDbItems.getItems();
    res.send(items);
});

itemsRouter.get('/:id', async (req, res) => {
    const items = await fileDbItems.getItems();
    const item = items.find(item => item.id === req.params.id);

    if (!item) {
        res.sendStatus(404);
        return;
    }
    res.send(item);
});

itemsRouter.post('/', imagesUpload.single('image'), async (req, res) => {
    if (!req.body.name) {
        res.status(400).send({"error": "Field name"})
    } else if (!req.body.categoryId) {
        res.status(400).send({"error": "Field category id"})
    } else if (!req.body.placeId) {
        res.status(400).send({"error": "Field place id"})
    }

    const usedCategory = await fileDbCategories.getItems();
    const categoryExists = usedCategory.find(item => item.id === req.body.categoryId);
    if (!categoryExists) {
        res.status(400).send({ "error": "Category does not exist" });
        return;
    }

    const usedPlace = await fileDbPlaces.getItems();
    const placeExists = usedPlace.find(item => item.id === req.body.placeId);
    if (!placeExists) {
        res.status(400).send({ "error": "Place does not exist" });
        return;
    }

    const item: ItemWithoutId = {
        name: req.body.name,
        categoryId: req.body.categoryId,
        placeId: req.body.placeId,
        description: req.body.description,
        image: req.file ? 'images/' + req.file.filename : null
    };
    const savedPost = await fileDbItems.addItem(item);

    res.send(savedPost);
});

itemsRouter.delete('/:id', async (req, res)=> {
    const items = await fileDbItems.getItems();
    const item = items.find(item => item.id === req.params.id);

    if (!item) {
        res.sendStatus(404);
        return;
    }

    await fileDbItems.delete(req.params.id);
    res.send('Deleted');
});

export default itemsRouter;
