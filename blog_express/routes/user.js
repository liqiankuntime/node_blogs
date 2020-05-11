const express = require('express');
const router = express.Router();

router.post('/login', (req, res, next) => {
    let { username, password} = req.body;
    res.json({
        errorno: 0,
        data: {
            username,
            password
        }
    })
})

module.exports= router;