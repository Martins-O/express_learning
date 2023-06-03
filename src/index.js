import express, { json, urlencoded } from 'express';
import groceriesRouter from './routes/groceries';

const app = express();
const PORT = 3004;

app.use(json());
app.use(urlencoded());

app.use((req, res, next) => {
    console.log(`${req.method}:${req.url}`);
    next();
});

app.use(groceriesRouter);

app.listen(PORT, () => console.log('listening on port ${PORT}'))



