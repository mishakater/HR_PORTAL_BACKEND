const router = require('express').Router();
import Feedbacks from '../model/Feedbacks';

router.post('/feedbacks', async (req, res) => {
  const { from, text, userId } = req.body;

  await Feedbacks.create({ from, text, userId, createdAt: new Date() });

  res.json({
    status: true,
  })
});

router.get('/feedbacks', async (req, res) => {
  const { userId } = req.params;

  const feedbacks = (await Feedbacks.find({ userId })).map(f => f.toObject());

  res.json({
    status: true,
    feedbacks
  })
});
