import express from 'express';
import fileDbCategories from "../fileDbCategories";
import {CategoryWithoutId} from "../types";
const categoryRouter = express.Router();

categoryRouter.get('/', async (req, res) => {
    const categories = await fileDbCategories.getItems();
    res.send(categories);
});

categoryRouter.get('/:id', async (req, res) => {
    const categories = await fileDbCategories.getItems();
    const category = categories.find(item => item.id === req.params.id);

    if (!category) {
        res.sendStatus(404);
        return;
    }
    res.send(category);
});

categoryRouter.post('/', async (req, res)=> {
    if (!req.body.name) {
        res.status(400).send({"error": "Field name"})
    }

    const category: CategoryWithoutId = {
        name: req.body.name,
        description:req.body.description
    };
    const saveCategory = await fileDbCategories.addItem(category);
    res.send(saveCategory);
});

categoryRouter.delete('/:id', async (req, res) => {
    const categories = await fileDbCategories.getItems();
    const category = categories.find(item => item.id === req.params.id);

    if (!category) {
        res.sendStatus(404);
        return;
    }

    await fileDbCategories.delete(req.params.id);
    res.send('Deleted');
});

export default categoryRouter;