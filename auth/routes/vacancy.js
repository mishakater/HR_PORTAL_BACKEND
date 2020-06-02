const router = require('express').Router();
const Vacancy = require('../model/Vacancy');

router.post('/vacancy', async (req, res) => {
    const vacancy = new Vacancy({
        heading: req.body.heading,
        company: req.body.company,
        description: req.body.description,
        salary: req.body.salary,
        category: req.body.category,
        employment: req.body.employment
    });
    try {
        const savedVacancy = await vacancy.save();
        res.send(savedVacancy);
    } catch (err) {
        res.status(400).send(err);
    }
});

router.get('/vacancy', async function (req, res, next) {
    const {vacancyID} = req.query;

    if ( !vacancyID) {
        res.json({
            status: false,
            error: 'invalid_request',
            message: '\'id\' field is required.'
        });
    }

    const vacancy = await Vacancy.find({_id: vacancyID});

    if ( !vacancy) {
        res.json({
            status: false,
            error: 'not_found',
            message: 'Vacancy post with given ID does not exist.'
        });
    }

    res.json(...vacancy);
});

router.get('/vacancy/all', function (req, res) {
    Vacancy.find({}, function (err, vacancies) {
        if (err) {
            res.send("ERROR");
            next();
        }
        res.json(vacancies);
    })
});

module.exports = router;