const router = require('express').Router();
const Profile = require('../model/Profile');
const User = require('../model/User');

router.post('/profile', async (req, res) => {
    const profile = new Profile({
        companyName: req.body.companyName,
        workExperience: req.body.workExperience,
        phone: req.body.phone,
        rating: req.body.rating,
        facebookLink: req.body.facebookLink,
        linkedinLink: req.body.linkedinLink,
        githubLink: req.body.githubLink,
        googleLink: req.body.googleLink,

    });
    try{
        const savedProfile = await profile.save();
        res.send(savedProfile);
    }catch(err){
        res.status(400).send(err);
    }
});

const toObject = d => d.toObject();

router.get('/profile', async function (req, res, next) {
    const {userId} = req.query;

    if (!userId) {
        res.json({
            status: false,
            error: 'invalid_request',
            message: '\'userId\' field is required.'
        });
    }

    const user = (await User.find({_id: userId})).map(toObject);
    const profile = (await Profile.find({userId})).map(toObject);

    if (!profile) {
        res.json({
            status: false,
            error: 'not_found',
            message: 'Profile for user with given ID does not exist.'
        });
    }

    res.json(profile.map(p => ({
        ...p,
        user: user.find(u => String(u._id) === String(p.userId))
    })));
});


router.get('/profile/all', async (req, res) => {
    function sortArrByRating(arr) {
        return arr.sort((a, b) => a.rating < b.rating ? 1 : -1);
    }

    const users = (await User.find()).map(toObject);
    const profiles = sortArrByRating((await Profile.find()).map(toObject));
    res.json(profiles.map(p => ({
        ...p,
        user: users.find(u => String(u._id) === String(p.userId))
    })))
});

router.put('/profile/:userId', async (req, res) => {
    const { name, email } = req.body;
    const { userId } = req.params;
  
    await Profiles.update({ userId }, { name, email });
  
    res.json({ status: true });
  })

module.exports = router;
