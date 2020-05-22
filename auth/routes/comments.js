const router = require('express').Router();
const Comments = require('../model/Comments');
const User = require('../model/User');

router.post('/comments', async (req, res) => {
    const comments = new Comments({
        commentText: req.body.commentText
    });
    try {
        const savedComment = await comments.save();
        res.send(savedComment);
    } catch (err) {
        res.status(400).send(err);
    }
});

const toObject = d => d.toObject();

router.get('/comments', async function (req, res, next) {
    const users = (await User.find()).map(toObject);
    const comments = (await Comments.find()).map(toObject());

    res.json(users.map(u => ({
        ...u,
        comment: comments.find(p => String(p.userId) === String(u._id))
    })));
});

module.exports = router;
