var express = require('express');
var router = express.Router({mergeParams: true})

router.post('/', function (req, res) {
})


router.get('/', function (req, res) {
    res.send({ title: 'At Signup' })
})

module.exports = router