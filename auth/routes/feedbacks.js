const router = require('express').Router();
const Feedbacks = require('../model/Feedbacks');

router.post('/feedbacks', async (req, res) => {
  const { from, text, userId } = req.body;

  await Feedbacks.create({ from, text, userId, createdAt: new Date() });

  res.json({
    status: true,
    msg: 'POSTED'
  })
});

router.get('/feedbacks', async (req, res) => {
  const { userId } = req.query;

  const feedbacks = (await Feedbacks.find({ userId })).map(f => f.toObject());

  res.json(feedbacks)
});

module.exports = router;

