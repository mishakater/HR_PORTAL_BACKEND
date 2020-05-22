const router = require('express').Router();
const Profile = require('../model/Profile');
const User = require('../model/User');

router.post('/profile', async (req, res) => {
    const profile = new Profile({
        userId: req.body.userId,
        companyName: req.body.companyName,
        workExperience: req.body.workExperience,
        phone: req.body.phone,
        rating: req.body.rating,
        facebookLink: req.body.facebookLink,
        linkedinLink: req.body.linkedinLink,
        githubLink: req.body.githubLink,
        googleLink: req.body.googleLink
    });
    try {
        const savedProfile = await profile.save();
        res.send(savedProfile);
    } catch (err) {
        res.status(400).send(err);
    }
});

const toObject = d => d.toObject();

router.get('/profile', async function (req, res, next) {
    const {userId} = req.query;

    if ( !userId) {
        res.json({
            status: false,
            error: 'invalid_request',
            message: '\'userId\' field is required.'
        });
    }

    const user = (await User.find({_id: userId})).map(toObject);
    const profile = (await Profile.find({userId})).map(toObject);

    if ( !profile) {
        res.json({
            status: false,
            error: 'not_found',
            message: 'Profile for user with given ID does not exist.'
        });
    }

    res.json(user.map(u => ({
        ...u,
        profile: profile.find(p => String(p.userId) === String(u._id))
    })));
});


router.get('/profile/all', async (req, res) => {
    const users = (await User.find()).map(toObject);
    const profiles = (await Profile.find()).map(toObject);

    res.json(users.map(u => ({
        ...u,
        profile: profiles.find(p => String(p.userId) === String(u._id))
    })))
});


module.exports = router;
