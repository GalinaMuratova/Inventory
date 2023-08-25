import express from 'express';
import categoryRouter from "./routers/categories";
import cors from 'cors';
import fileDbCategories from "./fileDbCategories";
import placesRouter from "./routers/places";
import fileDbPlaces from "./fileDbPlaces";

const app = express();
const port = 8000;
// app.use(cors());
app.use(express.json());
app.use('/categories', categoryRouter);
app.use('/places', placesRouter);

const run = async ()=> {
    await fileDbCategories.init();
    await fileDbPlaces.init();
    app.listen(port, () => {
        console.log(`Server started on ${port} port`);
    });
};

run().catch(e => console.error(e));