const router = require('express').Router();
const verify = require('./verifyToken');

router.get('/', verify, (req, res) => {
    res.json(req.user);
});

router.get('/me', verify, (req,res) => {

});

module.exports = router;