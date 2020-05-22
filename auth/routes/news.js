const router = require('express').Router();
const News = require('../model/News');

router.post('/news', async (req, res) => {
    const news = new News({
        imgUrl: req.body.imgUrl,
        header: req.body.header,
        shortDescription: req.body.shortDescription,
        text: req.body.text

    });
    try {
        const savedNews = await news.save();
        res.send(savedNews);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/news', async function (req, res, next) {
    const {post} = req.query;

    if ( !post) {
        res.json({
            status: false,
            error: 'invalid_request',
            message: '\'id\' field is required.'
        });
    }

    const news = await News.find({_id: post});

    if ( !news) {
        res.json({
            status: false,
            error: 'not_found',
            message: 'News post with given ID does not exist.'
        });
    }

    res.json(...news);
});

router.get('/news/all', function (req, res) {
    News.find({}, function (err, news) {
        if (err) {
            res.send("ERROR");
            next();
        }
        res.json(news);
    })
});

module.exports = router;