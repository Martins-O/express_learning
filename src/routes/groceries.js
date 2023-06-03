import { Router } from 'express';

const router = Router();

const groceries = [
    {
        item: 'milk',
        price: 100,
        quantity: 10,
    },
    {
        item: 'eggs',
        price: 200,
        quantity: 20,
    },
    {
        item: 'cheese',
        price: 300,
        quantity: 30,
    },
];


router.get(
    '/groceries',
    // (request, response, next) => {
    //     console.log('Before handling request');
    //     next();
    // },
    (req, res) => {
        res.send(groceries);
    }
    // (req, res, next) => {
    //     console.log('After finished handling request');
    //     // res.send(403);
    // }
);

router.get('/groceries/:item', (req, res) => {
    const { item } = req.params;
    const groceryItem = groceries.find((g) => g, item === item);
    res.send(groceryItem);
});

router.post('/groceries', (req, res) => {
    groceries.push(req.body);
    console.log(req.body);
    res.sendStatus(201)
});


export default router;