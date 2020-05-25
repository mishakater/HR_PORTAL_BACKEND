const router = require('express').Router();
const Feedbacks = require('../model/Feedbacks');
const Users = require('../model/User');
const Profile = require('../model/Profile');

router.post('/feedbacks', async (req, res) => {
    const {from, text, userId} = req.body;

    await Feedbacks.create({from, text, userId, createdAt: new Date()});

    res.json({
        status: true,
        msg: 'POSTED'
    })
});

router.get('/feedbacks', async (req, res) => {
    const {userId} = req.query;

    const feedbacks = (await Feedbacks.find({userId})).map(f => f.toObject());

    const users = (await Users.find({_id: {$in: feedbacks.map(f => f.from)}})).map(u => u.toObject());
    const profiles = (await Profile.find({userId: {$in: feedbacks.map(f => f.from)}})).map(p => p.toObject());

    res.json(feedbacks.map(f => ({
        ...f,
        from: {
            userData: users.find(({_id}) => _id.toString() === f.from.toString()),
            userDetails: profiles.find(({userId}) => userId.toString() === f.from.toString())
        }
    })));
});

module.exports = router;

