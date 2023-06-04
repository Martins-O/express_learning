const { Router } = require('express');
const User = require('../database/schemas/User')
const { hashPassword, comparePassword } = require('../utils/helpers')

const router = Router();

router.post('/login', async (request, response) => {
    const {username, password} = request.body;
    if (!username || !password) {
        return response.status(400).send({msg: 'Invalid username or password'})
    }
    const userDB = await User.findOne({username});
    if (!userDB) return response.status(401).send({msg: 'User not found'});
    const isValid = comparePassword(password, userDB.password)
    if (!isValid) {
        console.log('Authentication Failed');
        return response.status(401);
    }
    else {
        console.log('Authentication Successfully');
        request.session.user = userDB;
        return response.status(200);
    }

});

router.post('/register', async (req, res) => {
    const {username, email} = req.body;
    const userDB = await User.findOne({$or: [{username}, {email}]});
    if (userDB){
        res.status(400).send({msg: 'User already exists!'});
    }
    else {
        const hashedPassword = hashPassword(req.body.password);
        console.log(hashedPassword);
        const newUser = await User.create({
            username,
            password : hashedPassword,
            email
        });
        // await newUser.save();
        res.status(201);
    }
});

module.exports = router;