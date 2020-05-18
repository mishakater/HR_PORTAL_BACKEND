const router = require('express').Router();
const News = require('../model/News');

router.post('/news', async (req, res) => {
    const news = new News({
        imgUrl: req.body.imgUrl,
        header: req.body.header,
        text: req.body.text

    });
    try {
        const savedNews = await news.save();
        res.send(savedNews);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/news', function (req, res) {
    News.find({}, function (err, news) {
        if (err) {
            res.send("ERROR");
            next();
        }
        res.json(news);
    })
});

module.exports = router;