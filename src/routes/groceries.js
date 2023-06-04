const {Router} = require('express')

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

router.use((req, res, next) => {
    if (req.session.user) next();
    else {
        res.send(401)
    }
})

router.get(
    '/',
    (req, res) => {
        res.send(groceries);
    }
);

router.get('/:item', (req, res) => {
    console.log(req.cookies)
    const { item } = req.params;
    const groceryItem = groceries.find((g) => g.item === item);
    res.send(groceryItem);
});

router.post('/', (req, res) => {
    groceries.push(req.body);
    console.log(req.body);
    res.sendStatus(201)
});

router.get('/shopping/cart', (req, res) => {
    const { cart } = req.session;
    if (!cart){
        res.send("You have no cart session")
    }
    else {
        res.send(cart);
    }
});

router.post('/shopping/cart/item', (req, res) => {
    const  {item, quantity, price} = req.body;
    const cartItem = {item, quantity, price};
    const {cart} = {item, quantity, price};
    if (cart){
        // const {item} = cart;
        // item.push(cartItem);
        req.session.cart.item.push(cartItem)
    }else{
        req.session.cart = {
            item: [cartItem]
        }
    }
    res.send(201);
    console.log(cartItem);
})


module.exports = router;
