const router = require('express').Router();
import Feedbacks from '../model/Feedbacks';
import Users from '../model/User';

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

  const users = (await Users.find({ _id: { $in: feedbacks.map(f => f.from) }})).map(u => u.toObject());

  res.json({
    status: true,
    feedbacks: feedbacks.map(f => ({
      ...f,
      from: users.find(({ _id }) => _id === f.from)
    }))
  })
});
