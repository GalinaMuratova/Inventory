import express from 'express';
import categoryRouter from "./routers/categories";
import cors from 'cors';
import fileDbCategories from "./fileDbCategories";
import placesRouter from "./routers/places";
import fileDbPlaces from "./fileDbPlaces";
import itemsRouter from "./routers/items";
import fileDbItems from "./fileDbItems";

const app = express();
const port = 8000;
app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use('/categories', categoryRouter);
app.use('/places', placesRouter);
app.use('/items', itemsRouter);

const run = async ()=> {
    await fileDbCategories.init();
    await fileDbPlaces.init();
    await fileDbItems.init();
    app.listen(port, () => {
        console.log(`Server started on ${port} port`);
    });
};

run().catch(e => console.error(e));