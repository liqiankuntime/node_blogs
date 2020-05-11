const express = require('express');
const router = express.Router();

router.get('/list', (req, res, next) => {
    res.json({
        errorno: 0,
        data: [1,2,3]
    })
})

router.get('/detail', (req, res, next) => {
    res.json({
        errorno: 0,
        data: 'detail content'
    })
})

module.exports = router;