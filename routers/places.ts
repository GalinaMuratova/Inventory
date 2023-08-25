import express from 'express';
import {PlaceWithoutId} from "../types";
import fileDbPlaces from "../fileDbPlaces";
import fileDbItems from "../fileDbItems";
const placesRouter = express.Router();

placesRouter.get('/', async (req, res) => {
    const places = await fileDbPlaces.getItems();
    res.send(places);
});

placesRouter.get('/:id', async (req, res) => {
    const places = await fileDbPlaces.getItems();
    const place = places.find(item => item.id === req.params.id);

    if (!place) {
        res.sendStatus(404);
        return;
    }
    res.send(place);
});

placesRouter.post('/', async (req, res)=> {
    if (!req.body.name) {
        res.status(400).send({"error": "Field name"})
    }

    const place: PlaceWithoutId = {
        name: req.body.name,
        description:req.body.description
    };
    const savePlace = await fileDbPlaces.addItem(place);
    res.send(savePlace);
});

placesRouter.delete('/:id', async (req, res) => {
    const places = await fileDbPlaces.getItems();
    const place = places.find(item => item.id === req.params.id);

    const usedPlace = await fileDbItems.getItems();
    const itemsWithSamePlace = usedPlace.find(item => item.placeId === req.params.id);
    if (itemsWithSamePlace) {
        res.status(400).send({ "error": "This place is already in use. Can't be deleted" });
        return;
    }

    if (!place) {
        res.sendStatus(404);
        return;
    }

    await fileDbPlaces.delete(req.params.id);
    res.send('Deleted');
});

export default placesRouter;