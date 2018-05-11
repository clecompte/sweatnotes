const mongoose = require('mongoose');
const requireLogin = require('../middlewares/requireLogin');
const Exercise = mongoose.model('exercises');

module.exports = app => {
  app.get('/api/exercises', requireLogin, async (req, res) => {
    let exercises = await Exercise.find({ _user: req.user.id });
    
    try {
      res.send(exercises);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.post('/api/exercises', async (req, res) => {
    let { exerciseName, exerciseType, quantityUnit, exertionUnit, sets } = req.body;

    try {
      let exercise = new Exercise({
        exerciseName,
        exerciseType,
        quantityUnit,
        exertionUnit,
        sets: sets.map(set => ({ quantity: set.quantity, exertion: set.exertion })),
        _user: req.user.id,
        dateModified: Date.now()
      });

      await exercise.save();
      const user = await req.user.save();
      res.send(user);
    } catch(err) {
      res.status(422).send(err);
    }
  });

  app.put('/api/exercises', async (req, res) => {
    let { direction, exercise, set } = req.body;
    let change = (direction === 'increase' ? 2.5 : -2.5);

    try {
      let updatedExercise = await Exercise.findOneAndUpdate(
        {
          _id: exercise._id,
          sets: { $elemMatch: { _id: set._id } }
        },
        {
          $inc: { 'sets.$.exertion': change }
        },
        { new: true });

      res.send(updatedExercise);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.delete('/api/exercises/:id', async (req, res) => {
    try {
      let exercise = await Exercise.findOneAndRemove({ _id: req.params.id });
      res.send(exercise);
    } catch (err) {
      res.status(422).send(err);
    }
  });

  app.post('/api/exercises/duplicate/:id', async (req, res) => {
    try {
      let exercise = await Exercise.findOne({ _id: req.params.id });
      exercise._id = mongoose.Types.ObjectId();
      duplicateExercise = new Exercise(exercise.toObject());
      duplicateExercise.save();
    } catch (err) {
      res.status(422).send(err);
    }
  });
}
