const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');

const Exercise = mongoose.model('exercises');

module.exports = app => {
  app.get('/api/exercises', requireLogin, async (req, res) => {
    const exercises = await Exercise.find({ _user: req.user.id });

    res.send(exercises);
  });

  app.post('/api/exercises', requireLogin, async (req, res) => {
    const { exercise_name, exercise_type, quantity_unit, exertion_unit } = req.body;

    const exercise = new Exercise({
      exercise_name,
      exercise_type,
      quantity_unit,
      exertion_unit,
      //set,
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
