const router = require('express').Router();
const Profile = require('../model/Profile');

router.post('/profileadd', async (req, res) => {
    const profile = new Profile({
        companyName: req.body.companyName,
        workExperience: req.body.workExperience,
        phone: req.body.phone,
        facebookLink: req.body.facebookLink,
        linkedinLink: req.body.linkedinLink,
        githubLink: req.body.githubLink,
        googleLink: req.body.googleLink,

    });
    try {
        const savedProfile = await profile.save();
        res.send(savedProfile);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/profileadd', function (req, res, next) {
    Profile.find({}, function (err, profiles) {
        if (err) {
            res.send("ERROR");
            next();
        }
        res.json(profiles);
    })
});


module.exports = router;
