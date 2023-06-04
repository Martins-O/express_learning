const {Router} = require('express');

const router = Router();

const supermarkets = [
    {
        id: 1,
        store: "Whole foods",
        miles: 0.6
    },
    {
        id: 2,
        store: "Trader Joe's",
        miles: 0.34
    },
    {
        id: 3,
        store: "Alberts",
        miles: 56
    },
];

router.use((req, res, next) => {
    if (req.session.user) next();
    else {
        res.send(401)
    }
})
router.get('/', (req, res) => {
    const {miles} = req.query;
    const parsedMiles = parseInt(miles);
    if (!isNaN(parsedMiles)){
        const filteredStores = supermarkets.filter((s) => s.miles <= miles);
        res.send(filteredStores);
    }
    else
        res.send(supermarkets);
});

router.get('/:store', (req, res) => {
    const { store } = req.params;
    const stores = supermarkets.find((m) => m.store === store)
    res.send(stores)
});

router.post('/', (req, res) => {
    supermarkets.push(req.body);
    console.log('req.body', req.body)
    res.sendStatus(201)
});

router.delete('/:store', (req, res) => {
    supermarkets.pop();
    console.log('req.body', req.body)
    res.send(201);
});

module.exports = router;
