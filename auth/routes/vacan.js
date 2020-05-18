const router = require('express').Router();
const Vacancy = require('../model/Vacancy');

router.post('/vacancy', async (req, res) => {
    const vacancy = new Vacancy({
        heading: req.body.heading,
        description: req.body.description,
        salary: req.body.salary,

    });
    try {
        const savedVacancy = await vacancy.save();
        res.send(savedVacancy);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/vacancy', function (req, res) {
    Vacancy.find({}, function (err, vacancies) {
        if (err) {
            res.send("ERROR");
            next();
        }
        res.json(vacancies);
    })
});

module.exports = router;