const express = require('express');
const { getAll, seed, add, generateJWT,verifyJWT,get } = require('../models/users');
const router = express.Router();

router.get('/', (req, res, next) => {

    getAll()
        .then((users) => {
            res.send(users);
        })
        .catch(next)

})
    .post('/seed', (req, res, next) => {

        seed()
            .then(() => {
                res.send({ message: 'Users seeded' });
            }).catch(next);

    })

    .post('/addUser', (req, res, next) => {
        add(req.body)
            .then(x => {
                const data = { data: x, isSuccess: true };
                res.send(data)
            }).catch(next);

    })
    ///api/v1/users/login
    .post('/login', (req, res, next) => {
        //console.log(req.body)
        const { email, password } = req.body;
        getAll()
            .then(async (users) =>  {
                const user = users.find(x => x.email === email && x.password === password);
                if (user) {
                    const token = await generateJWT(user);
                    const loginData = { token, user };

                    const data = { data: loginData, isSuccess: true };
                    res.send(data);
                } else {
                    const data = { data: null, isSuccess: false };
                    res.send(data);
                }
            })
            .catch(next)

    })

module.exports = router;