const express = require('express');
const cookieParser = require('cookie-parser');
const session = require('express-session');
const authRoute = require('./routes/auth');
const groceriesRouter = require('./routes/groceries')
const marketRouter = require('./routes/markets')

require('./database')

const app = express();
const PORT = 3001;



app.use(express.json());
app.use(express.urlencoded());
app.use(cookieParser());
app.use(session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: false
}));


app.use((req, res, next) => {
    console.log(`${req.method}:${req.url}`);
    next();
});

app.use('/api/v1/groceries',groceriesRouter);
app.use('/api/v1/market', marketRouter);
app.use('/api/v1/auth', authRoute);

app.listen(PORT, () => console.log(`listening on port ${PORT}!`))