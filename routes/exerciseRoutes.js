const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Exercise = mongoose.model('exercises');

module.exports = app => {
  app.get('/api/exercises', requireLogin, async (req, res) => {
    const exercises = await Exercise.find({ _user: req.user.id });

    res.send(exercises);
  });

  app.post('/api/exercises', async (req, res) => {
    const { exerciseName, exerciseType, quantityUnit, exertionUnit, sets } = req.body;

    const exercise = new Exercise({
      exerciseName,
      exerciseType,
      quantityUnit,
      exertionUnit,
      sets: sets.map(set => ({ quantity: set.quantity, exertion: set.exertion })),
      _user: req.user.id,
      dateModified: Date.now()
    });

    try {
      await exercise.save();
      const user = await req.user.save();
      res.send(user);
    } catch(err) {
      res.status(422).send(err);
    }
  });
}
